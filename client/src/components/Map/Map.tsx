import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {salaryData} from './data';
import UkraineSvg from './map.svg'
import * as topojson from "topojson-client";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'


export const MapComponent = React.memo(() => {
    const [geoJSONData, setGeoJSONData] = useState<GeoJSON>(null);
    const svgRef = useRef();


    const processD3 = async () => {
        const svgNode = svgRef.current;
        const margin = {top: 10, right: 10, bottom: 10, left: 10}
        const width = 800 - margin.left - margin.right
        const height = 600 - margin.top - margin.bottom;
        const topodata = await d3.json("https://raw.githubusercontent.com/org-scn-design-studio-community/sdkcommunitymaps/master/geojson/Europe/Ukraine-regions.json")
        // console.log(topodata)
        const geojson = topojson.feature(topodata, topodata.objects.UKR_adm1);

        setGeoJSONData(geojson);

        const projection = d3.geoAlbers().rotate([-30, 0, 0]).fitSize([.9 * width, .9 * height], geojson)

        const path = d3.geoPath().projection(projection);

        const bounds = path.bounds(geojson)


        const json = {};
        geojson.features.forEach((feature) => {
            json[feature.properties.ID_1] = {
                name: feature.properties.NAME_1
            }
        })

        console.log(json)


        const colorScale = d3.scaleThreshold()
            .domain([10000, 12000, 16000, 20000, 25000, 30000])
            .range(d3.schemeBlues[7]);

        const svg = d3.select("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        console.log(svg)

        svg.selectAll("path")
            .data(geojson.features)
            .enter().append("path")
            .attr("d", path)
            .attr('fill', function (d) {
                // console.log(d);
                if (salaryData[d.properties.ID_1]) {
                    // console.log(salaryData[d.properties.ID_1].salary);
                    return colorScale(salaryData[d.properties.ID_1].salary)
                }
            })
            .attr('stroke', '#333')
            .style("fill", function (d) {
                // console.log(d);

                // json[d.properties.ID_1] = {
                //   name: d.properties.NAME_1
                // }
                // // console.log({elem: d, name: d.properties.NAME_1, id: d.properties.ID_1});
                // // console.log(json)
                // if (d.id == 22) {
                //   return "red";//on condition match
                // }
            });
        // const mymap = L.map('mapid').setView([51.505, -0.09], 13);
    };

    useEffect(() => {
        if (svgRef.current) {
            processD3();
        }


        // setSvg(svg.node());


    }, [svgRef]);

    return (
        <>
            {geoJSONData && (
                <MapContainer  center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        style='mapbox://styles/mapbox/light-v10'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        data={geoJSONData}
                    />

                    {/*<Marker position={[51.505, -0.09]}>*/}
                    {/*    <Popup>*/}
                    {/*        A pretty CSS3 popup. <br /> Easily customizable.*/}
                    {/*    </Popup>*/}
                    {/*</Marker>*/}
                </MapContainer>
            )}


            <div ref={svgRef}>
                <UkraineSvg/>
            </div>
        </>

    )
});
