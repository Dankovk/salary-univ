const colorScale = d3.scaleThreshold()
    .domain([10000, 12000, 16000, 20000, 25000, 30000])
    .range(d3.schemeBlues[7]);

const svg = d3.select(DOM.svg(width, height))
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
const json = {};
svg.selectAll("path")
    .data(geojson.features)
    .enter().append("path")
    .attr("d", path)
    .attr('fill', function (d) {
        console.log(d);
        if (salaryData[d.properties.ID_1]) {
            console.log(salaryData[d.properties.ID_1].salary);
            return colorScale(salaryData[d.properties.ID_1].salary)
        }
    })
    .attr('stroke', '#333')
    .style("fill", function (d) {

        // json[d.properties.ID_1] = {
        //   name: d.properties.NAME_1
        // }
        // console.log({elem: d, name: d.properties.NAME_1, id: d.properties.ID_1});
        // console.log(json)
        // if (d.id == 22) {
        //   return "red";//on condition match
        // }
    })

return svg.node();

const path = d3.geoPath().projection(projection);
const projection = d3.geoAlbers().rotate([-30, 0, 0]).fitSize([.9 * width, .9 * height], geojson)
const bounds = path.bounds(geojson)
const geojson = topojson.feature(topodata, topodata.objects.UKR_adm1);
const topodata = d3.json("https://raw.githubusercontent.com/org-scn-design-studio-community/sdkcommunitymaps/master/geojson/Europe/Ukraine-regions.json")
const margin = {top: 10, right: 10, bottom: 10, left: 10}
const width = 800 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom;
const topojson = require("topojson-client");
const d3 = d3;
d3.geoAlbers();
