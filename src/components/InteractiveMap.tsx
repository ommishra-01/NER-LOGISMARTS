import React, { useEffect, useRef, useState, useMemo } from "react";
import L from "leaflet";
import { 
  NER_HIGHWAYS, 
  NER_ROAD_HAZARDS, 
  NER_POIS, 
  NER_FARMER_MSME_CLUSTERS,
  NER_ROUTE_NODES,
  POPULAR_CORRIDOR_PRESETS,
  calculateNerRoute,
  PopularCorridorPreset
} from "../data/nerData";
import { 
  RoadHazard, 
  POI, 
  MSMEFarmerCluster, 
  UserMode, 
  CalculatedRouteResult 
} from "../types";
import { 
  Layers, 
  AlertTriangle, 
  Hospital, 
  Fuel, 
  Shield, 
  Wrench, 
  Home, 
  Wheat, 
  Maximize2, 
  Sparkles,
  RefreshCw,
  Search,
  ArrowRightLeft,
  Route,
  Clock,
  Compass,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  X,
  Camera,
  ChevronRight,
  Eye,
  Info,
  Globe,
  Truck,
} from "lucide-react";
import { AllIndiaRoutesModal } from "./AllIndiaRoutesModal";

const PAN_INDIA_NODE_IDS = [
  "node-siliguri",
  "node-kolkata",
  "node-delhi",
  "node-patna",
  "node-mumbai",
  "node-bengaluru",
  "node-lucknow",
];

interface InteractiveMapProps {
  userMode: UserMode;
  selectedHazard: RoadHazard | null;
  onSelectHazard: (hazard: RoadHazard | null) => void;
  selectedCluster: MSMEFarmerCluster | null;
  onSelectCluster: (cluster: MSMEFarmerCluster | null) => void;
  onOpenAIAssistant: (routeContext?: any) => void;
  showDriverRoute?: boolean;
  hazards?: RoadHazard[];
  onOpenLiveCamera?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  userMode,
  selectedHazard,
  onSelectHazard,
  selectedCluster,
  onSelectCluster,
  onOpenAIAssistant,
  hazards,
  onOpenLiveCamera,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<{ [key: string]: L.LayerGroup }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Layer Visibility State
  const [layers, setLayers] = useState({
    highways: true,
    bypasses: true,
    hazards: true,
    hospitals: true,
    petrolPumps: true,
    garages: true,
    police: true,
    reliefCamps: true,
    msmeClusters: userMode !== "driver",
  });

  const [activeTile, setActiveTile] = useState<"standard" | "terrain" | "dark">("standard");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeBypassId, setActiveBypassId] = useState<string | null>(
    selectedHazard ? selectedHazard.id : "haz-sonapur-landslide"
  );

  // Route Search Engine States (Consolidated Single Bar)
  const [originNodeId, setOriginNodeId] = useState<string>("node-guwahati");
  const [destNodeId, setDestNodeId] = useState<string>("node-silchar");
  const [isBypassActive, setIsBypassActive] = useState<boolean>(false);
  const [activeRouteResult, setActiveRouteResult] = useState<CalculatedRouteResult | null>(null);

  // Top Bar Dropdown Menus
  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);
  const [isPoiMenuOpen, setIsPoiMenuOpen] = useState<boolean>(false);
  const [isLayersOpen, setIsLayersOpen] = useState<boolean>(false);
  const [isRouteDetailsOpen, setIsRouteDetailsOpen] = useState<boolean>(false);
  const [isAllIndiaModalOpen, setIsAllIndiaModalOpen] = useState<boolean>(false);
  const [quickActionStatus, setQuickActionStatus] = useState<string | null>(null);

  // ResizeObserver for fluid map rendering
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize({ pan: false });
      }
    });
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // 1. Initialize Map and Layer Groups ONCE
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Center on North East India (Assam / Meghalaya / Nagaland junction)
    const map = L.map(mapContainerRef.current, {
      center: [25.8, 93.1],
      zoom: 7.5,
      minZoom: 5.5,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: true,
    });

    // Place Zoom Control bottom-right to keep top and sides 100% open
    L.control.zoom({ position: "bottomright" }).addTo(map);
    mapRef.current = map;

    // Create Dedicated Layer Groups
    const groups: { [key: string]: L.LayerGroup } = {
      highways: L.layerGroup().addTo(map),
      bypasses: L.layerGroup().addTo(map),
      hazards: L.layerGroup().addTo(map),
      hospitals: L.layerGroup().addTo(map),
      petrolPumps: L.layerGroup().addTo(map),
      garages: L.layerGroup().addTo(map),
      police: L.layerGroup().addTo(map),
      reliefCamps: L.layerGroup().addTo(map),
      msmeClusters: L.layerGroup().addTo(map),
      routeOverlay: L.layerGroup().addTo(map),
      searchMarkers: L.layerGroup().addTo(map),
    };
    layersGroupRef.current = groups;

    // Add Tile Layer
    updateTileLayer("standard");

    // Populate Static Highways into their layer groups
    populateStaticHighways(groups);

    // Populate Static POIs into their layer groups
    populateStaticPois(groups);

    // Compute initial route (Guwahati -> Silchar)
    const orig = NER_ROUTE_NODES.find((n) => n.id === "node-guwahati");
    const dest = NER_ROUTE_NODES.find((n) => n.id === "node-silchar");
    if (orig && dest) {
      const res = calculateNerRoute(orig, dest, false);
      setActiveRouteResult(res);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Tile layer updater
  const updateTileLayer = (type: "standard" | "terrain" | "dark") => {
    if (!mapRef.current) return;
    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current);
    }

    let url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    if (type === "terrain") {
      url = "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
      attribution = 'Map data: &copy; OpenStreetMap, SRTM | Style: OpenTopoMap';
    } else if (type === "dark") {
      url = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
      attribution = '&copy; <a href="https://carto.com/">CARTO</a>';
    }

    tileLayerRef.current = L.tileLayer(url, {
      attribution,
      maxZoom: 18,
    }).addTo(mapRef.current);

    setActiveTile(type);
  };

  // Populate Static National Highways and Bypasses (Populated ONCE)
  const populateStaticHighways = (groups: { [key: string]: L.LayerGroup }) => {
    NER_HIGHWAYS.forEach((hw) => {
      const isBypass = hw.type === "BYPASS";

      // Subtle dark casing for crisp definition against light/satellite basemaps
      const casing = L.polyline(hw.coordinates, {
        color: "#0f172a",
        weight: isBypass ? 5 : 5,
        opacity: 0.5,
        interactive: false,
      });

      const polyline = L.polyline(hw.coordinates, {
        color: hw.color,
        weight: isBypass ? 3 : 3.5,
        dashArray: isBypass ? "6, 6" : undefined,
        opacity: 0.85,
      });

      polyline.bindTooltip(
        `<strong>${hw.name}</strong> (${hw.totalLengthKm} km) - ${hw.condition.replace(/_/g, ' ')}`,
        { sticky: true }
      );

      polyline.bindPopup(`
        <div style="font-family: sans-serif; min-width: 210px; padding: 4px;">
          <div style="font-weight: bold; color: #0f172a; font-size: 13px; margin-bottom: 3px;">
            ${hw.name}
          </div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 4px;">
            <strong>Type:</strong> ${hw.type} | <strong>Length:</strong> ${hw.totalLengthKm} km
          </div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 4px;">
            <strong>Elevation:</strong> ${hw.elevationProfile}
          </div>
          <div style="font-size: 11px; color: ${hw.condition === 'high_landslide_risk' ? '#b91c1c' : '#047857'}; font-weight: bold;">
            Condition: ${hw.condition.replace(/_/g, ' ').toUpperCase()}
          </div>
        </div>
      `);

      if (isBypass) {
        groups.bypasses.addLayer(casing);
        groups.bypasses.addLayer(polyline);
      } else {
        groups.highways.addLayer(casing);
        groups.highways.addLayer(polyline);
      }
    });
  };

  // Populate Static POIs into respective Layer Groups (Populated ONCE)
  const populateStaticPois = (groups: { [key: string]: L.LayerGroup }) => {
    NER_POIS.forEach((poi) => {
      let iconColor = "#2563eb";
      let iconHtml = "📍";
      let targetGroup: L.LayerGroup = groups.hospitals;

      if (poi.type === "hospital") {
        iconColor = "#ef4444";
        iconHtml = "🏥";
        targetGroup = groups.hospitals;
      } else if (poi.type === "petrol_pump") {
        iconColor = "#f59e0b";
        iconHtml = "⛽";
        targetGroup = groups.petrolPumps;
      } else if (poi.type === "garage") {
        iconColor = "#d97706";
        iconHtml = "🔧";
        targetGroup = groups.garages;
      } else if (poi.type === "police") {
        iconColor = "#3b82f6";
        iconHtml = "🛡️";
        targetGroup = groups.police;
      } else if (poi.type === "relief_camp") {
        iconColor = "#10b981";
        iconHtml = "⛺";
        targetGroup = groups.reliefCamps;
      }

      const customIcon = L.divIcon({
        className: "custom-poi-marker",
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background: ${iconColor};
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            cursor: pointer;
          ">${iconHtml}</div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([poi.lat, poi.lng], { icon: customIcon });
      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 190px; padding: 4px;">
          <div style="font-weight: bold; color: #0f172a; font-size: 13px; margin-bottom: 2px;">
            ${poi.name}
          </div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 3px;">
            ${poi.district}, ${poi.state}
          </div>
          <div style="font-size: 11px; color: #0f172a; font-weight: 500;">
            📞 <a href="tel:${poi.phone}" style="color: #0284c7; text-decoration: none;">${poi.phone}</a>
          </div>
        </div>
      `);

      targetGroup.addLayer(marker);
    });

    // Farmer / MSME Mandi Clusters
    NER_FARMER_MSME_CLUSTERS.forEach((cluster) => {
      const clusterIcon = L.divIcon({
        className: "custom-cluster-marker",
        html: `
          <div style="
            width: 28px;
            height: 28px;
            background: #059669;
            border: 2px solid #a7f3d0;
            box-shadow: 0 2px 8px rgba(5,150,105,0.4);
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            cursor: pointer;
          ">🌾</div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([cluster.lat, cluster.lng], { icon: clusterIcon });
      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 220px; padding: 4px;">
          <div style="font-weight: bold; color: #065f46; font-size: 13px; margin-bottom: 2px;">
            ${cluster.name}
          </div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 3px;">
            ${cluster.district}, ${cluster.state} • <strong>${cluster.produceName}</strong>
          </div>
          <div style="font-size: 11px; color: #0f172a; margin-bottom: 2px;">
            Annual Yield: <strong>${cluster.annualVolumeTons} Tons</strong>
          </div>
          <div style="font-size: 11px; color: #059669; font-weight: bold;">
            Primary Market: ${cluster.primaryMarket}
          </div>
        </div>
      `);
      groups.msmeClusters.addLayer(marker);
    });
  };

  // 2. High-Performance Layer Toggling (Zero Canvas Thrashing)
  useEffect(() => {
    const map = mapRef.current;
    const groups = layersGroupRef.current;
    if (!map || !groups) return;

    const layerMap: { [key in keyof typeof layers]?: L.LayerGroup } = {
      highways: groups.highways,
      bypasses: groups.bypasses,
      hazards: groups.hazards,
      hospitals: groups.hospitals,
      petrolPumps: groups.petrolPumps,
      garages: groups.garages,
      police: groups.police,
      reliefCamps: groups.reliefCamps,
      msmeClusters: groups.msmeClusters,
    };

    (Object.keys(layerMap) as Array<keyof typeof layers>).forEach((key) => {
      const group = layerMap[key];
      if (!group) return;

      const shouldShow = layers[key];
      const isAttached = map.hasLayer(group);

      if (shouldShow && !isAttached) {
        map.addLayer(group);
      } else if (!shouldShow && isAttached) {
        map.removeLayer(group);
      }
    });
  }, [layers]);

  // 3. Update Hazards Group only when hazards or activeBypassId change
  useEffect(() => {
    const groups = layersGroupRef.current;
    if (!groups || !groups.hazards) return;

    groups.hazards.clearLayers();

    const hazardsToDisplay = hazards && hazards.length > 0 ? hazards : NER_ROAD_HAZARDS;
    hazardsToDisplay.forEach((hazard) => {
      const isSelected = activeBypassId === hazard.id;
      const isCamera = !!hazard.isLiveCameraReport;
      const color = isCamera ? "#dc2626" : (hazard.hazardType === "landslide" ? "#dc2626" : "#2563eb");

      const iconHtml = `
        <div style="
          width: ${isCamera ? "38px" : "32px"};
          height: ${isCamera ? "38px" : "32px"};
          background: ${color};
          border: 3px solid ${isCamera ? "#fef08a" : "#ffffff"};
          box-shadow: 0 4px 14px ${isCamera ? "rgba(220,38,38,0.7)" : "rgba(0,0,0,0.35)"};
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: ${isCamera ? "18px" : "15px"};
          cursor: pointer;
          ${isSelected ? "outline: 3px solid #10b981; transform: scale(1.15);" : ""}
        ">
          ${isCamera ? "📷" : (hazard.hazardType === "landslide" ? "⛰️" : "🌊")}
        </div>
      `;

      const marker = L.marker([hazard.lat, hazard.lng], {
        icon: L.divIcon({
          className: "hazard-marker",
          html: iconHtml,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        }),
      });

      marker.on("click", () => {
        setActiveBypassId(hazard.id);
        onSelectHazard(hazard);
      });

      marker.bindPopup(`
        <div style="font-family: sans-serif; min-width: 240px; padding: 4px;">
          <div style="font-weight: bold; color: ${color}; font-size: 13px; margin-bottom: 2px;">
            ${isCamera ? "🔴 LIVE CITIZEN CAM INCIDENT" : "⚠️ ACTIVE CORRIDOR HAZARD"}
          </div>
          <div style="font-size: 12px; font-weight: bold; color: #0f172a; margin-bottom: 3px;">
            ${hazard.locationName} (${hazard.state})
          </div>
          <div style="font-size: 11px; color: #475569; margin-bottom: 4px;">
            <strong>Corridor:</strong> ${hazard.roadName} | <strong>Severity:</strong> ${hazard.severity.toUpperCase()}
          </div>
          <div style="font-size: 11px; color: #0f172a; margin-bottom: 4px; background: #fee2e2; padding: 4px 6px; border-radius: 4px;">
            ${hazard.advisory}
          </div>
          ${hazard.bypassAvailable ? `
            <div style="font-size: 11px; color: #065f46; font-weight: bold; margin-top: 4px;">
              🟢 Active Alternate Bypass: ${hazard.bypassRoadName} (+${hazard.bypassDistanceKm} km)
            </div>
          ` : ""}
        </div>
      `);

      groups.hazards.addLayer(marker);
    });
  }, [hazards, activeBypassId, onSelectHazard]);

  // 4. Update Active Route Polyline & Markers (High Contrast, Layer on Top)
  useEffect(() => {
    const groups = layersGroupRef.current;
    if (!groups || !groups.routeOverlay || !groups.searchMarkers) return;

    groups.routeOverlay.clearLayers();
    groups.searchMarkers.clearLayers();

    if (!activeRouteResult || activeRouteResult.waypoints.length === 0) return;

    const isBypass = activeRouteResult.bypassActive;
    const lineColor = isBypass ? "#10b981" : "#0284c7"; // Emerald for bypass, Electric Sky for trunk

    // Prominent High-Contrast Outer Glow / Shadow
    const glowPolyline = L.polyline(activeRouteResult.waypoints, {
      color: "#020617",
      weight: 10,
      opacity: 0.9,
      interactive: false,
    });
    groups.routeOverlay.addLayer(glowPolyline);

    // Main Core Route Line
    const routePolyline = L.polyline(activeRouteResult.waypoints, {
      color: lineColor,
      weight: 6,
      opacity: 1,
      dashArray: isBypass ? "9, 8" : undefined,
    });

    routePolyline.bindPopup(`
      <div style="font-family: sans-serif; padding: 6px; min-width: 220px;">
        <div style="font-weight: bold; color: ${isBypass ? '#047857' : '#0284c7'}; font-size: 13px; margin-bottom: 4px;">
          ${isBypass ? '🟢 Safe AI Mountain Bypass' : '🚚 Active Freight Corridor'}
        </div>
        <div style="font-size: 12px; color: #0f172a; font-weight: 600;">
          ${activeRouteResult.origin.name} ➔ ${activeRouteResult.destination.name}
        </div>
        <div style="font-size: 11px; color: #475569; margin-top: 3px;">
          ${activeRouteResult.highwayNames.join(" • ")}
        </div>
        <div style="font-size: 12px; color: #0f172a; margin-top: 6px; font-weight: bold; background: #f1f5f9; padding: 4px 6px; border-radius: 4px;">
          ${activeRouteResult.totalDistanceKm} km • ~${activeRouteResult.estimatedHours} hrs
        </div>
      </div>
    `);

    groups.routeOverlay.addLayer(routePolyline);

    // Bring route lines cleanly to front so they are never obscured by national highways
    glowPolyline.bringToFront();
    routePolyline.bringToFront();

    // Origin Marker (Green Pin)
    const origMarker = L.marker(activeRouteResult.origin.coords, {
      icon: L.divIcon({
        className: "origin-marker",
        html: `
          <div style="
            background: #10b981;
            color: white;
            font-size: 11px;
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 9999px;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span>🟢</span>
            <span>START: ${activeRouteResult.origin.name}</span>
          </div>
        `,
        iconAnchor: [40, 16],
      }),
    });
    origMarker.bindPopup(`<strong>Origin:</strong> ${activeRouteResult.origin.name} (${activeRouteResult.origin.state})`);
    groups.searchMarkers.addLayer(origMarker);

    // Destination Marker (Rose Pin)
    const destMarker = L.marker(activeRouteResult.destination.coords, {
      icon: L.divIcon({
        className: "dest-marker",
        html: `
          <div style="
            background: #e11d48;
            color: white;
            font-size: 11px;
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 9999px;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span>🏁</span>
            <span>END: ${activeRouteResult.destination.name}</span>
          </div>
        `,
        iconAnchor: [40, 16],
      }),
    });
    destMarker.bindPopup(`<strong>Destination:</strong> ${activeRouteResult.destination.name} (${activeRouteResult.destination.state})`);
    groups.searchMarkers.addLayer(destMarker);
  }, [activeRouteResult, isBypassActive]);

  // Sync external selected hazard
  useEffect(() => {
    if (selectedHazard) {
      setActiveBypassId(selectedHazard.id);
      if (mapRef.current) {
        mapRef.current.flyTo([selectedHazard.lat, selectedHazard.lng], 10, {
          duration: 1.0,
          easeLinearity: 0.25,
        });
      }
    }
  }, [selectedHazard]);

  // Sync external selected cluster
  useEffect(() => {
    if (selectedCluster && mapRef.current) {
      mapRef.current.flyTo([selectedCluster.lat, selectedCluster.lng], 10, {
        duration: 1.0,
        easeLinearity: 0.25,
      });
    }
  }, [selectedCluster]);

  // Route Search Action
  const handleCalculateRoute = (bypass: boolean = isBypassActive) => {
    const orig = NER_ROUTE_NODES.find((n) => n.id === originNodeId);
    const dest = NER_ROUTE_NODES.find((n) => n.id === destNodeId);
    if (!orig || !dest) return;

    const result = calculateNerRoute(orig, dest, bypass);
    setActiveRouteResult(result);
    setIsBypassActive(bypass);

    // Fit bounds cleanly with top padding so route line is 100% visible
    if (mapRef.current && result.waypoints.length > 0) {
      const bounds = L.latLngBounds(result.waypoints.map((c) => [c[0], c[1]]));
      mapRef.current.fitBounds(bounds, {
        paddingTopLeft: [60, 50],
        paddingBottomRight: [50, 50],
        maxZoom: 10,
        animate: true,
        duration: 1.0,
      });
    }
  };

  // Swap Origin and Destination
  const handleSwapNodes = () => {
    const nextOrig = destNodeId;
    const nextDest = originNodeId;
    setOriginNodeId(nextOrig);
    setDestNodeId(nextDest);

    const orig = NER_ROUTE_NODES.find((n) => n.id === nextOrig);
    const dest = NER_ROUTE_NODES.find((n) => n.id === nextDest);
    if (orig && dest) {
      const result = calculateNerRoute(orig, dest, isBypassActive);
      setActiveRouteResult(result);
      if (mapRef.current && result.waypoints.length > 0) {
        const bounds = L.latLngBounds(result.waypoints.map((c) => [c[0], c[1]]));
        mapRef.current.fitBounds(bounds, {
          paddingTopLeft: [60, 50],
          paddingBottomRight: [50, 50],
          maxZoom: 10,
          animate: true,
          duration: 1.0,
        });
      }
    }
  };

  // Select Popular Corridor Preset
  const handleSelectPreset = (preset: PopularCorridorPreset) => {
    setOriginNodeId(preset.originId);
    setDestNodeId(preset.destinationId);
    setIsBypassActive(false);
    setIsPresetsOpen(false);

    const orig = NER_ROUTE_NODES.find((n) => n.id === preset.originId);
    const dest = NER_ROUTE_NODES.find((n) => n.id === preset.destinationId);
    if (orig && dest) {
      const result = calculateNerRoute(orig, dest, false);
      setActiveRouteResult(result);

      if (mapRef.current && result.waypoints.length > 0) {
        const bounds = L.latLngBounds(result.waypoints.map((c) => [c[0], c[1]]));
        mapRef.current.fitBounds(bounds, {
          paddingTopLeft: [60, 50],
          paddingBottomRight: [50, 50],
          maxZoom: 10,
          animate: true,
          duration: 1.0,
        });
      }
    }
  };

  // Toggle Bypass for Current Route
  const handleToggleRouteBypass = () => {
    const nextBypass = !isBypassActive;
    setIsBypassActive(nextBypass);
    handleCalculateRoute(nextBypass);
  };

  // Fly to Nearest POI
  const findNearestPOI = (type: "hospital" | "petrol_pump" | "garage" | "police") => {
    setIsPoiMenuOpen(false);
    const map = mapRef.current;
    if (!map) return;

    const refCoords = activeRouteResult?.origin.coords || [26.14, 91.78];
    const candidatePois = NER_POIS.filter((p) => p.type === type);
    if (candidatePois.length === 0) return;

    let nearest = candidatePois[0];
    let minDistance = Infinity;

    candidatePois.forEach((poi) => {
      const dist = Math.hypot((poi.lat - refCoords[0]) * 111, (poi.lng - refCoords[1]) * 102);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = poi;
      }
    });

    setQuickActionStatus(`Nearest ${type.replace("_", " ")}: ${nearest.name} (~${Math.round(minDistance)} km)`);
    setTimeout(() => setQuickActionStatus(null), 4000);

    map.flyTo([nearest.lat, nearest.lng], 13, { duration: 1.1, easeLinearity: 0.25 });

    const groups = layersGroupRef.current;
    const targetGroup = 
      type === "hospital" ? groups.hospitals :
      type === "petrol_pump" ? groups.petrolPumps :
      type === "garage" ? groups.garages : groups.police;

    if (targetGroup) {
      targetGroup.eachLayer((layer: any) => {
        if (layer.getLatLng && Math.abs(layer.getLatLng().lat - nearest.lat) < 0.001) {
          layer.openPopup();
        }
      });
    }
  };

  // Re-center whole NER Region
  const resetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo([25.8, 93.1], 7.5, { duration: 1.0, easeLinearity: 0.25 });
    }
  };

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className={`relative w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl ${isFullScreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      {/* Map Leaflet Container (Fully visible without big cards blocking it) */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[580px]" />

      {/* SINGLE CONSOLIDATED TOP BAR */}
      <div className="absolute top-2.5 inset-x-2.5 z-[1000] flex flex-col gap-2 pointer-events-none">
        {/* Main Unified Bar */}
        <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl px-3 py-2 shadow-2xl flex flex-wrap items-center justify-between gap-2 text-white text-xs">
          
          {/* Section 1: Route Search (From, Swap, To, Calculate) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* NER Route Branding */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-800/60 shrink-0">
              <Route className="w-3.5 h-3.5" />
              <span>NER Navigator</span>
            </div>

            {/* FROM selector */}
            <div className="flex items-center bg-slate-950 border border-slate-700/90 rounded-xl px-2.5 py-1 gap-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">From:</span>
              <select
                value={originNodeId}
                onChange={(e) => setOriginNodeId(e.target.value)}
                className="bg-transparent text-xs text-white font-medium outline-none cursor-pointer max-w-[130px] sm:max-w-[160px]"
              >
                <optgroup label="🇮🇳 Pan-India National Gateways" className="bg-slate-900 font-bold text-sky-400">
                  {NER_ROUTE_NODES.filter((n) => PAN_INDIA_NODE_IDS.includes(n.id)).map((node) => (
                    <option key={node.id} value={node.id} className="bg-slate-900 text-white font-normal">
                      {node.name} ({node.state})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="⛰️ North East Capitals & Mandis" className="bg-slate-900 font-bold text-emerald-400">
                  {NER_ROUTE_NODES.filter((n) => !PAN_INDIA_NODE_IDS.includes(n.id)).map((node) => (
                    <option key={node.id} value={node.id} className="bg-slate-900 text-white font-normal">
                      {node.name} ({node.state})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwapNodes}
              title="Swap Origin & Destination"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 hover:text-white transition cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>

            {/* TO selector */}
            <div className="flex items-center bg-slate-950 border border-slate-700/90 rounded-xl px-2.5 py-1 gap-1.5">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">To:</span>
              <select
                value={destNodeId}
                onChange={(e) => setDestNodeId(e.target.value)}
                className="bg-transparent text-xs text-white font-medium outline-none cursor-pointer max-w-[130px] sm:max-w-[160px]"
              >
                <optgroup label="⛰️ North East Capitals & Mandis" className="bg-slate-900 font-bold text-emerald-400">
                  {NER_ROUTE_NODES.filter((n) => !PAN_INDIA_NODE_IDS.includes(n.id)).map((node) => (
                    <option key={node.id} value={node.id} className="bg-slate-900 text-white font-normal">
                      {node.name} ({node.state})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🇮🇳 Pan-India National Gateways" className="bg-slate-900 font-bold text-sky-400">
                  {NER_ROUTE_NODES.filter((n) => PAN_INDIA_NODE_IDS.includes(n.id)).map((node) => (
                    <option key={node.id} value={node.id} className="bg-slate-900 text-white font-normal">
                      {node.name} ({node.state})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Calculate Route Action */}
            <button
              type="button"
              onClick={() => handleCalculateRoute(isBypassActive)}
              className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition cursor-pointer shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Route</span>
            </button>

            {/* Dedicated Pan-India Routes Button */}
            <button
              type="button"
              onClick={() => {
                setIsAllIndiaModalOpen(true);
                setIsPresetsOpen(false);
                setIsPoiMenuOpen(false);
                setIsLayersOpen(false);
              }}
              className="py-1.5 px-2.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-700/80 transition cursor-pointer shadow-sm"
              title="Browse all national routes connecting India to North East"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">All-India Routes</span>
              <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-mono">
                7
              </span>
            </button>

            {/* Popular Corridors Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsPresetsOpen(!isPresetsOpen);
                  setIsPoiMenuOpen(false);
                  setIsLayersOpen(false);
                }}
                className={`py-1.5 px-2.5 rounded-xl text-[11px] font-semibold flex items-center gap-1 border transition cursor-pointer ${
                  isPresetsOpen
                    ? "bg-slate-800 text-white border-slate-600"
                    : "bg-slate-900 text-slate-300 border-slate-700/80 hover:bg-slate-800"
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Corridors</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Popular Corridors Dropdown Popover */}
              {isPresetsOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-80 bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-xl p-2 shadow-2xl z-[1100] space-y-1 max-h-96 overflow-y-auto">
                  <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1 flex items-center justify-between border-b border-slate-800">
                    <span>Popular North East Corridors</span>
                    <button onClick={() => setIsPresetsOpen(false)} className="text-slate-400 hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  {POPULAR_CORRIDOR_PRESETS.map((preset) => (
                    <button
                      key={preset.title}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-[11px] transition flex items-center justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px]">{preset.category === "pan_india" ? "🇮🇳" : "⛰️"}</span>
                          <span className="font-semibold text-slate-200 group-hover:text-emerald-400 block">
                            {preset.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block pl-4">
                          {preset.highwayLabel}
                        </span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Active Route Metrics & Hazard Bypass Toggle */}
          {activeRouteResult && (
            <div className="flex items-center gap-2">
              {/* Route Summary Chip */}
              <button
                type="button"
                onClick={() => setIsRouteDetailsOpen(!isRouteDetailsOpen)}
                className="bg-slate-950/80 hover:bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-xl flex items-center gap-1.5 text-[11px] transition cursor-pointer"
                title="Click to view corridor elevation & details"
              >
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-bold text-white">{activeRouteResult.totalDistanceKm} km</span>
                <span className="text-slate-400">• ~{activeRouteResult.estimatedHours}h</span>
                <Info className="w-3 h-3 text-slate-400" />
              </button>

              {/* Hazard on Route Warning & Bypass Button */}
              {activeRouteResult.hazardsOnRoute.length > 0 ? (
                <button
                  type="button"
                  onClick={handleToggleRouteBypass}
                  className={`px-2.5 py-1 rounded-xl font-bold text-[11px] flex items-center gap-1.5 border transition cursor-pointer ${
                    isBypassActive
                      ? "bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-600/20"
                      : "bg-red-600/90 hover:bg-red-500 text-white border-red-500 animate-pulse shadow-md shadow-red-600/30"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  <span>{isBypassActive ? "Bypass Active" : "Hazard! Engage Bypass"}</span>
                </button>
              ) : (
                <span className="hidden xl:flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-lg border border-emerald-800/40">
                  <CheckCircle2 className="w-3 h-3" /> Clear Corridor
                </span>
              )}

              {/* AI Route Search Advisor Button */}
              <button
                type="button"
                onClick={() => onOpenAIAssistant({
                  origin: activeRouteResult.origin.name,
                  destination: activeRouteResult.destination.name,
                  distanceKm: activeRouteResult.totalDistanceKm,
                  estimatedHours: activeRouteResult.estimatedHours,
                  highwayCode: activeRouteResult.highwayNames.join(" / "),
                  hazards: activeRouteResult.hazardsOnRoute.map((h) => `${h.hazardType} at ${h.locationName} (${h.roadName})`),
                })}
                className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-500 hover:to-teal-500 border border-emerald-500/50 text-white px-2.5 py-1 rounded-xl flex items-center gap-1.5 text-[11px] font-bold shadow-md shadow-emerald-600/20 transition cursor-pointer"
                title="Ask AI Search Advisor about this Corridor"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span className="hidden md:inline">AI Advisor</span>
              </button>
            </div>
          )}

          {/* Section 3: Tools (Quick POIs, Layers, Live Cam, Center, Fullscreen) */}
          <div className="flex items-center gap-1.5">
            {/* Quick POIs Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsPoiMenuOpen(!isPoiMenuOpen);
                  setIsPresetsOpen(false);
                  setIsLayersOpen(false);
                }}
                className={`p-1.5 rounded-xl border transition cursor-pointer flex items-center gap-1 text-[11px] ${
                  isPoiMenuOpen
                    ? "bg-slate-800 text-white border-slate-600"
                    : "bg-slate-900 text-slate-300 border-slate-700/80 hover:bg-slate-800"
                }`}
                title="Locate Nearest POI"
              >
                <Fuel className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline">POIs</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* POI Popover */}
              {isPoiMenuOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-52 bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-xl p-1.5 shadow-2xl z-[1100] space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1 border-b border-slate-800">
                    Locate Nearest Lifeline:
                  </div>
                  <button
                    type="button"
                    onClick={() => findNearestPOI("hospital")}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-[11px] flex items-center gap-2 text-red-300 cursor-pointer"
                  >
                    <Hospital className="w-3.5 h-3.5 text-red-400" />
                    <span>24/7 Trauma Hospital</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => findNearestPOI("petrol_pump")}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-[11px] flex items-center gap-2 text-amber-300 cursor-pointer"
                  >
                    <Fuel className="w-3.5 h-3.5 text-amber-400" />
                    <span>Diesel &amp; Petrol Station</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => findNearestPOI("garage")}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-[11px] flex items-center gap-2 text-orange-300 cursor-pointer"
                  >
                    <Wrench className="w-3.5 h-3.5 text-orange-400" />
                    <span>Heavy Truck Crane &amp; Garage</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => findNearestPOI("police")}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800 text-[11px] flex items-center gap-2 text-blue-300 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    <span>State Border Checkpost</span>
                  </button>
                </div>
              )}
            </div>

            {/* Layers Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsLayersOpen(!isLayersOpen);
                  setIsPresetsOpen(false);
                  setIsPoiMenuOpen(false);
                }}
                className={`p-1.5 rounded-xl border transition cursor-pointer flex items-center gap-1 text-[11px] ${
                  isLayersOpen
                    ? "bg-slate-800 text-white border-slate-600"
                    : "bg-slate-900 text-slate-300 border-slate-700/80 hover:bg-slate-800"
                }`}
                title="Toggle Layers & Basemap"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline">Layers</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Layers Popover */}
              {isLayersOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-64 bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-xl p-3 shadow-2xl z-[1100] space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px] font-bold text-slate-200">
                    <span>Map Layers</span>
                    <button onClick={resetView} className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1">
                      <RefreshCw className="w-2.5 h-2.5" /> Center NER
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={layers.highways}
                        onChange={() => toggleLayer("highways")}
                        className="rounded bg-slate-800 border-slate-700 text-amber-500"
                      />
                      <span>National Highways</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={layers.bypasses}
                        onChange={() => toggleLayer("bypasses")}
                        className="rounded bg-slate-800 border-slate-700 text-teal-500"
                      />
                      <span>State Bypasses</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={layers.hazards}
                        onChange={() => toggleLayer("hazards")}
                        className="rounded bg-slate-800 border-slate-700 text-red-500"
                      />
                      <span className="text-red-400 font-semibold">Hazards / Slides</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={layers.hospitals}
                        onChange={() => toggleLayer("hospitals")}
                        className="rounded bg-slate-800 border-slate-700 text-red-500"
                      />
                      <span>24/7 Hospitals</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={layers.petrolPumps}
                        onChange={() => toggleLayer("petrolPumps")}
                        className="rounded bg-slate-800 border-slate-700 text-amber-500"
                      />
                      <span>Fuel Pumps</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={layers.garages}
                        onChange={() => toggleLayer("garages")}
                        className="rounded bg-slate-800 border-slate-700 text-orange-500"
                      />
                      <span>Garages / Cranes</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={layers.police}
                        onChange={() => toggleLayer("police")}
                        className="rounded bg-slate-800 border-slate-700 text-blue-500"
                      />
                      <span>Checkposts</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer hover:text-white p-1 rounded hover:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={layers.msmeClusters}
                        onChange={() => toggleLayer("msmeClusters")}
                        className="rounded bg-slate-800 border-slate-700 text-emerald-400"
                      />
                      <span>Agro Mandis</span>
                    </label>
                  </div>

                  {/* Basemap Switcher */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Style:</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => updateTileLayer("standard")}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          activeTile === "standard" ? "bg-emerald-600 text-white font-bold" : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        Street
                      </button>
                      <button
                        onClick={() => updateTileLayer("terrain")}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          activeTile === "terrain" ? "bg-emerald-600 text-white font-bold" : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        Topo
                      </button>
                      <button
                        onClick={() => updateTileLayer("dark")}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          activeTile === "dark" ? "bg-emerald-600 text-white font-bold" : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        Voyager
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Live Camera Button */}
            {onOpenLiveCamera && (
              <button
                type="button"
                onClick={onOpenLiveCamera}
                className="py-1.5 px-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-red-600/30 transition cursor-pointer shrink-0"
                title="Report Live Incident via Camera"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Live Cam</span>
              </button>
            )}

            {/* AI Advisor Button */}
            <button
              type="button"
              onClick={() => onOpenAIAssistant(activeRouteResult ? {
                origin: activeRouteResult.origin.name,
                destination: activeRouteResult.destination.name,
                distanceKm: activeRouteResult.totalDistanceKm,
                estimatedHours: activeRouteResult.estimatedHours,
                highwayCode: activeRouteResult.highwayNames.join(" / "),
                hazards: activeRouteResult.hazardsOnRoute.map((h) => `${h.hazardType} at ${h.locationName} (${h.roadName})`),
              } : undefined)}
              className="py-1.5 px-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition cursor-pointer shrink-0"
              title="Open AI Mountain Dispatch Advisor"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Advisor</span>
            </button>

            {/* Center NER Map */}
            <button
              type="button"
              onClick={resetView}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
              title="Center North East Map"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Map"}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Corridor Chips Bar (1-Tap Route Launcher) */}
        <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-2 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 shadow-xl text-[10px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pr-1 flex items-center gap-1">
            <Truck className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">Corridor Shortcuts:</span>
          </span>
          {POPULAR_CORRIDOR_PRESETS.map((preset) => {
            const isSelected =
              activeRouteResult?.origin.id === preset.originId &&
              activeRouteResult?.destination.id === preset.destinationId;
            const isPanIndia = preset.category === "pan_india";
            return (
              <button
                key={preset.title}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`shrink-0 px-2.5 py-1 rounded-lg font-medium transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30"
                    : isPanIndia
                    ? "bg-slate-950/80 hover:bg-slate-800 text-blue-300 border border-blue-900/60"
                    : "bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
                }`}
              >
                <span>{isPanIndia ? "🇮🇳" : "⛰️"}</span>
                <span>{preset.title}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Action Status Toast */}
        {quickActionStatus && (
          <div className="pointer-events-auto self-center bg-emerald-900/90 text-emerald-100 border border-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{quickActionStatus}</span>
          </div>
        )}

        {/* Expandable Route Details Bar / Drawer */}
        {isRouteDetailsOpen && activeRouteResult && (
          <div className="pointer-events-auto self-center w-full max-w-2xl bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-2xl p-3 shadow-2xl text-white text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm">
                  {activeRouteResult.origin.name} ➔ {activeRouteResult.destination.name} Corridor Dossier
                </span>
              </div>
              <button onClick={() => setIsRouteDetailsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Total Distance:</span>
                <span className="font-bold text-white text-sm">{activeRouteResult.totalDistanceKm} km</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Est. Driving Time:</span>
                <span className="font-bold text-white text-sm">~{activeRouteResult.estimatedHours} hrs</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Elevation Profile:</span>
                <span className="font-bold text-emerald-400 text-sm">{activeRouteResult.elevationGainMeters}m gain</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Tolls &amp; Checkposts:</span>
                <span className="font-bold text-white text-sm">{activeRouteResult.tollsAndCheckpostsCount} Gates</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1 text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Highways Covered:</span>
                <span className="font-semibold text-emerald-400">{activeRouteResult.highwayNames.join(" • ")}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenAIAssistant({
                    origin: activeRouteResult.origin.name,
                    destination: activeRouteResult.destination.name,
                    distanceKm: activeRouteResult.totalDistanceKm,
                    estimatedHours: activeRouteResult.estimatedHours,
                    highwayCode: activeRouteResult.highwayNames.join(" / "),
                    hazards: activeRouteResult.hazardsOnRoute.map((h) => `${h.hazardType} at ${h.locationName}`),
                  })}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Ask AI Route Advisor</span>
                </button>
                {activeRouteResult.hazardsOnRoute.length > 0 && (
                  <button
                    type="button"
                    onClick={handleToggleRouteBypass}
                    className="text-amber-400 hover:underline font-bold cursor-pointer"
                  >
                    {isBypassActive ? "Disable Bypass" : "Engage Mountain Bypass"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* National Corridors All-India to North East Modal */}
      <AllIndiaRoutesModal
        isOpen={isAllIndiaModalOpen}
        onClose={() => setIsAllIndiaModalOpen(false)}
        onSelectRoute={handleSelectPreset}
      />
    </div>
  );
};
