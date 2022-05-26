import React from "react";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 95000])
  .range(["#ffd4cc", "#ff2600"] as any);

export const MapChart = ({ setTooltipContent, dataForMap }: any) => {

  return (
    <ComposableMap
      data-tip={{}}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 170
      }}
      width={920}
    >
      <ZoomableGroup>
        <Sphere id="rsm-sphere" stroke="#d9d9d9" fill="transparent" strokeWidth={0.5} />
        <Graticule stroke="#d9d9d9" strokeWidth={0.5} />
        {dataForMap.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = dataForMap.find((s: any) => s.ISO3 === geo.properties.ISO_A3);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["num_sequences_total"]) : "#d9d9d9" as any}
                    onMouseEnter={() => {
                      setTooltipContent(d);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent({});
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
