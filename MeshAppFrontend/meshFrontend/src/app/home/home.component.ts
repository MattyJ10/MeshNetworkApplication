import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { MeshService } from '../mesh.service'; 
import { Chart } from 'chart.js'; 
import { NgxGraphModule } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { Network, DataSet } from 'vis';

/*
    Pi IPs:
    172.27.0.15 (gateway) x
    172.27.0.32 (access point) x
    172.27.0.12 (routing) 
    172.27.0.90 (access point) 
    172.27.0.78 (routing) x
*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    public trafficChart:any = [];
    public lengthChart:any = []; 
    public totalProtChart:any = []; 
    public externalChart:any = []; 
    public ips = ["172.27.0.15", "172.27.0.152", "172.27.0.12", "172.27.0.90", "172.27.0.78"]; 
    public runningIps = []; 
    public clickedIP; 
    public networkData: any; 
    public networkLinks: any; 
    public IPChart:any = []; 

    //modal variables
    public viewingIp; 
    public packetChart:any = []; 
    public protChart:any = []; 

    public currentTab; 

    //traffic control
    public slowedIps = [ "172.27.0.68", "172.27.0.178"]; 
    public priorityIps = ["172.27.0.15"]; 
    public throttleInput; 
    public prioritizeinput;


    graphData = {};
    @ViewChild('graphContainer') graph: ElementRef;

    constructor(private meshService: MeshService) { }

    ngOnInit() {
        //first, get IPs and Link Files
        //Second get Packet Data
        this.currentTab = "network";
        // this.networkData = {"172.27.0.15": {"172.27.0.90": {"count": 287}, "totalsize": 64440, "count": 287, "protocol": {"TCP": 240, "DATA-TEXT-LINES": 2, "JSON": 19, "HTTP": 26}, "length": 224}, 
        //                     "172.27.0.78": {"totalsize": 630244, "port": {}, "224.0.0.251": {"count": 389}, "count": 5095, "172.27.0.90": {"count": 4618}, "172.27.255.255": {"count": 3}, "35.222.85.5": {"count": 11}, "35.224.99.156": {"count": 74}, "protocol": {"TCP": 137, "NBNS": 3, "DATA-TEXT-LINES": 1, "HTTP": 24, "_WS.MALFORMED": 1, "JSON": 7, "DNS": 4922}, "length": 123}, 
        //                     "172.27.0.90": {"totalsize": 764260, "port": {}, "172.27.0.82": {"count": 4618}, "172.27.0.115": {"count": 10}, "count": 5313, "172.27.0.78": {"count": 287}, "172.27.0.135": {"count": 62}, "172.27.0.32": {"count": 336}, "protocol": {"TCP": 540, "DATA-TEXT-LINES": 3, "HTTP": 59, "_WS.MALFORMED": 1, "BOOTP": 116, "JSON": 51, "DNS": 4543}, "length": 143}, 
        //                     "172.27.0.32": {"totalsize": 86898, "port": {}, "count": 336, "172.27.0.90": {"count": 336}, "protocol": {"TCP": 232, "BOOTP": 54, "JSON": 25, "HTTP": 25}, "length": 258}, 
        //                     "172.27.0.12": {"172.27.0.90": {"count": 62}, "totalsize": 21204, "count": 62, "protocol": {"BOOTP": 62}, "length": 342}, 
        //                     "172.27.0.115": {"173.194.12.91": {"count": 12}, "protocol": {"QUIC": 410, "TCP": 48, "SSL": 17, "HTTP": 16, "XML": 1, "DNS": 12}, "224.0.0.251": {"count": 2}, "172.217.6.78": {"count": 31}, "port": {}, "172.27.0.90": {"count": 10}, "239.255.255.250": {"count": 15}, "172.217.6.68": {"count": 19}, "length": 803, "172.217.0.42": {"count": 35}, "74.125.170.123": {"count": 11}, "74.125.170.122": {"count": 298}, "count": 504, "52.49.211.202": {"count": 13}, "216.58.194.174": {"count": 31}, "216.58.195.67": {"count": 5}, "172.217.5.106": {"count": 15}, "totalsize": 405081, "216.58.195.68": {"count": 7}}};  
        this.networkLinks = {"172.27.0.15": ["172.27.0.90", "172.27.0.12", "172.27.0.152", "172.27.0.78"], "172.27.0.152": ["172.27.0.12"], "172.27.0.12": ["172.27.0.90"], "172.27.0.90": ["172.27.0.78"]};
        this.getData(); 
    }

    getTrafficControl() {
        //General logic: 
            //Initial: 
                //Parse JSON Data and get array of slowed and prioritized IPs

            //Add IP:
                //Add new IP to current list, add to JSON Object, send to server to update

            //Remove IP:
                //Remove from current list, remove from JSON Object, send to server to update file

        //Make a call to API endpoint to get a list of the currently slowed IPs

        //Make a call to API endpoint to get a list of the currently prioritized IPs
    }

    throttleIP() {

    }

    prioritizeIP() {

    }

    createNetGraph() {
        var nodes = new DataSet();
        nodes.add({id: "Internet", x: 0, y: -600, shape: 'image', image: '../../assets/images/internet.png', size: 50});
        let x = 0; 
        let y = -500; 
        for (let i = 0; i < this.ips.length; i++) {
            nodes.add({id: this.ips[i], label: this.ips[i], x: x, y: y});
            if (i == 0) {
                x = 300;
                y = -300;
            } else {
                x -= 200; 
                y = -300;
            }
        }
        // create an array with edges
        var edges = new DataSet();
        edges.add({from: "Internet", to: "172.27.0.15"})

        for (let key in this.networkLinks) {
            for (let i = 0; i < this.networkLinks[key].length; i++) {
                edges.add({from: key, to: this.networkLinks[key][i], color: 'red'});
            }
        }
        // create a network
        var container = this.graph.nativeElement as HTMLElement;

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };
        let width = 400; 
        let height = 400;
        var options = {
            edges: {
                color: {
                    color: 'white',
                    highlight: 'blue'
                },
                smooth: true,
                length: 300,
                width: 8
            },
            interaction: {
                dragNodes: false,
                dragView: false,
                hover:true,
                zoomView: false
            },
            physics:{
               stabilization: true,
            },
            nodes: {
                fixed: {
                    x:true,
                    y:true
                },
                shape: 'box',
                font: {
                    size: 28
                },
                color: {
                    background: '#A3ADC4',
                    border: '#253031'
                },
                borderWidth: 3
            }

        };

        var network = new Network(container, data, options);

        //click event handler
        let self = this; 
        network.on("click", function (params) {
            
            let trafficLabels = []; 
            let trafficData = []; 
            if (params.nodes[0] != "Internet") {
                self.viewingIp = params.nodes[0];
                var data = self.networkData[params.nodes[0]];
                for (let key in data) {
                    if (data[key].count && trafficLabels.length < 21) {
                        trafficLabels.push(key); 
                        trafficData.push(data[key].count); 
                    } else if (trafficLabels.length > 20) {
                        break; 
                    }
                }
                self.packetChart = new Chart('trafficChart', {
                    type: 'bar',

                    data: {
                        datasets: [{
                            data: trafficData,
                            backgroundColor: "#5C6784"
                        }],
                        labels: trafficLabels
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: "Packets Sent/Received"
                        }
                    }
                });
                let protLabels = [];
                let protData = []; 
                for (let key in data.protocol) {
                    protLabels.push(key); 
                    protData.push(data.protocol[key]); 
                }
                self.protChart = new Chart('protChart', {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: protData,
                            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA", "#CAE1FF", "#00E5EE", "#00C78C", "#8FBC8F", "#FFD700", "#FFA500", "#FF6347"]
                        }],
                        labels: protLabels
                    }
                })
            }
        });
    }

    getData() {

        this.meshService.getPacketData().subscribe(
            data => {
                let trafficCounts = [];
                let routeCounts = [];
                let lengths = [];

                let prots:any = []; 
                let protCounts:any = []; 
                let protMap = new Map();

                let externalIps = []; 
                let externalIpsCount = []; 

                console.log(data); 
                this.networkData = data; 
                for (let key in this.networkData) {
                    for (let prot in this.networkData[key]["protocol"]) {
                        if (protMap.has(prot))
                            protMap.set(prot, protMap.get(prot) + this.networkData[key]['protocol'][prot]);
                        else 
                            protMap.set(prot, this.networkData[key]['protocol'][prot]);
                    }
                    if (!this.ips.includes(key) && this.networkData[key].count) {
                        externalIps.push(key);
                        externalIpsCount.push(this.networkData[key].count); 
                    }
                }
                for (let i = 0; i < this.ips.length; i++) {
                    if (this.ips[i] in this.networkData) {
                        trafficCounts.push(this.networkData[this.ips[i]].count);
                        lengths.push(this.networkData[this.ips[i]].length);
                        routeCounts.push(this.networkData[this.ips[i]].routecount);
                    } else {
                        trafficCounts.push(0);  
                        lengths.push(0);
                    }
                }
                console.log(routeCounts);
                prots = Array.from(protMap.keys()); 
                protCounts = Array.from(protMap.values()); 
                let protColors = []; 

                this.createNetGraph();
                this.externalChart = new Chart('externals', {
                    type: 'bar',
                    data: {
                        labels: externalIps,
                        datasets: [
                            {
                                data: externalIpsCount,
                                backgroundColor: "#1D263B"
                            }
                        ]
                    },
                     options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                ticks: {
                                    fontSize: 15
                                }
                            }],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    fontSize: 15
                                }
                            }],
                        },
                        title: {
                            display: true,
                            text: "External Traffic",
                            fontColor: "black",
                            fontSize: 30
                        },
                        gridLines: {
                            color: "black",
                            lineWidth: 10
                        }
                    }
                })

                this.trafficChart = new Chart('traffic', {
                    type: 'bar',
                    data: {
                        labels: this.ips,
                        datasets: [
                            {
                                label: "Packets",
                                data: trafficCounts,
                                backgroundColor: "#70A0AF"
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                ticks: {
                                    fontSize: 15
                                }
                            }],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    fontSize: 15
                                }
                            }],
                        },
                        title: {
                            display: true,
                            text: "Node Traffic",
                            fontColor: "black",
                            fontSize: 30
                        },
                        gridLines: {
                            color: "black",
                            lineWidth: 10
                        }
                    }

                });
                this.lengthChart = new Chart("length", {
                    type: 'bar',
                    data: {
                        labels: this.ips,
                        datasets: [
                            {
                                label: "Length",
                                data: lengths,
                                backgroundColor: "#4CB963"
                            },
                            {
                                label: "Route Count",
                                data: routeCounts,
                                backgroundColor: "#706993"
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                ticks: {
                                    fontSize: 15
                                }
                            }],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    fontSize: 15
                                }
                            }],
                        },
                        title: {
                            display: true,
                            text: "Length of Packets",
                            fontColor: "black",
                            fontSize: 30
                        },
                        gridLines: {
                            color: "black",
                            lineWidth: 10
                        }
                    }
                }); 

                this.totalProtChart = new Chart("protocols", {
                    type: 'pie',
                    data: {
                        labels: prots,
                        datasets: [
                            {
                                data: protCounts,
                                backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                            }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: "Protocols Used",
                            fontColor: "black",
                            fontSize: 30
                        },
                    }
                })

            }
        )
    }

    closeModal() {
        this.viewingIp = null;
        if (this.packetChart) 
            this.packetChart.destroy(); 
        if (this.protChart)
            this.protChart.destroy();
    }
}
