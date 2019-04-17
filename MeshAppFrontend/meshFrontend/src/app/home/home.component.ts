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
    public piCharts:any = {};  
    public ips = ["172.27.0.15", "172.27.0.32", "172.27.0.12", "172.27.0.90", "172.27.0.78"]; 
    public clickedIP; 
    public networkData: any; 
    public networkLinks: any; 
    public IPChart:any = []; 
    enableMultiEdges = true;
    graphData = {};
    @ViewChild('graphContainer') graph: ElementRef;

    constructor(private meshService: MeshService) { }

    ngOnInit() {
        //get the data files on init and then display the charts based on which is selected
        //get all the IPs for nodes and populate the ip list
        this.getData(); 
    }

    clickedNode(entry) {
        console.log(entry); 
        this.clickedIP = entry; 
        console.log(this.networkData[entry]); 
    }

    createNetGraph() {
        var nodes = new DataSet();

        nodes.add({id: "Internet", label: "Internet", x: 0, y: -500});
        let x = 0; 
        let y = -300; 
        for (let i = 0; i < this.ips.length; i++) {
            nodes.add({id: this.ips[i], label: this.ips[i], x: x, y: y});
            if (i == 0) {
                x = 300;
                y = -100;
            } else {
                x -= 200; 
                y = -100;
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
                    color: 'black',
                    highlight: 'red'
                },
                smooth: true,
                length: 300
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
                }
            }

        };

        // initialize your network!
        var network = new Network(container, data, options);
    }

    createProtChart(ip, data) {
        let protocols = data[ip].protocol; 
        let labels = [];  
        let counts = []; 
        for (let prot in protocols) {
            labels.push(prot); 
            counts.push(protocols[prot]); 
        } 
        let protocolChart:any = []; 
        /*protocolChart = new Chart(ip, {
            type: 'pie', 
            data: {
                datasets: [{
                    data: counts
                }],
                labels: labels
            },
            options: {
                title: {
                    display: true,
                    text: "Protocols For " + ip,
                    fontColor: "green",
                    fontSize: 48,
                    padding: 20
                }
            }
        })
        this.piCharts[ip] = protocolChart;  */
    }

    getData() {
        this.networkData = {"172.27.0.15": {"172.27.0.90": {"count": 287}, "totalsize": 64440, "count": 287, "protocol": {"TCP": 240, "DATA-TEXT-LINES": 2, "JSON": 19, "HTTP": 26}, "length": 224}, 
                            "172.27.0.78": {"totalsize": 630244, "port": {}, "224.0.0.251": {"count": 389}, "count": 5095, "172.27.0.90": {"count": 4618}, "172.27.255.255": {"count": 3}, "35.222.85.5": {"count": 11}, "35.224.99.156": {"count": 74}, "protocol": {"TCP": 137, "NBNS": 3, "DATA-TEXT-LINES": 1, "HTTP": 24, "_WS.MALFORMED": 1, "JSON": 7, "DNS": 4922}, "length": 123}, 
                            "172.27.0.90": {"totalsize": 764260, "port": {}, "172.27.0.82": {"count": 4618}, "172.27.0.115": {"count": 10}, "count": 5313, "172.27.0.78": {"count": 287}, "172.27.0.135": {"count": 62}, "172.27.0.32": {"count": 336}, "protocol": {"TCP": 540, "DATA-TEXT-LINES": 3, "HTTP": 59, "_WS.MALFORMED": 1, "BOOTP": 116, "JSON": 51, "DNS": 4543}, "length": 143}, 
                            "172.27.0.32": {"totalsize": 86898, "port": {}, "count": 336, "172.27.0.90": {"count": 336}, "protocol": {"TCP": 232, "BOOTP": 54, "JSON": 25, "HTTP": 25}, "length": 258}, 
                            "172.27.0.12": {"172.27.0.90": {"count": 62}, "totalsize": 21204, "count": 62, "protocol": {"BOOTP": 62}, "length": 342}, 
                            "172.27.0.115": {"173.194.12.91": {"count": 12}, "protocol": {"QUIC": 410, "TCP": 48, "SSL": 17, "HTTP": 16, "XML": 1, "DNS": 12}, "224.0.0.251": {"count": 2}, "172.217.6.78": {"count": 31}, "port": {}, "172.27.0.90": {"count": 10}, "239.255.255.250": {"count": 15}, "172.217.6.68": {"count": 19}, "length": 803, "172.217.0.42": {"count": 35}, "74.125.170.123": {"count": 11}, "74.125.170.122": {"count": 298}, "count": 504, "52.49.211.202": {"count": 13}, "216.58.194.174": {"count": 31}, "216.58.195.67": {"count": 5}, "172.217.5.106": {"count": 15}, "totalsize": 405081, "216.58.195.68": {"count": 7}}};        
        this.networkLinks = {"172.27.0.15": ["172.27.0.90", "172.27.0.12", "172.27.0.32", "172.27.0.78"], "172.27.0.32": ["172.27.0.12"], "172.27.0.12": ["172.27.0.90"], "172.27.0.90": ["172.27.0.78"]};
        let trafficCounts = [];
        let lengths = [];  
        let protocolCounts = {};
        this.createNetGraph();
        this.trafficChart = new Chart('traffic', {
            type: 'bar',
            data: {
                labels: this.ips,
                datasets: [
                    {
                        data: trafficCounts,
                        borderColor: 'blue',
                        backgroundColor: ["blue", "green", "red", "yellow", "orange", "purple"]
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
                layout: {
                    padding: {
                        left: 100,
                        right: 100, 
                        top: 50,
                        bottom: 50
                    }
                },
                title: {
                    display: true,
                    text: "IP Traffic",
                    fontColor: "black",
                    fontSize: 48,
                    padding: 20
                },
                events: [],
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
                        data: lengths,
                        borderColor: 'red',
                        backgroundColor: ["blue", "green", "red", "yellow", "orange", "purple"]
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
                layout: {
                    padding: {
                        left: 100,
                        right: 100, 
                        top: 50,
                        bottom: 50
                    }
                },
                title: {
                    display: true,
                    text: "Average Length of Packets",
                    fontColor: "black",
                    fontSize: 48,
                    padding: 20
                },
                events: [],
                gridLines: {
                    color: "black",
                    lineWidth: 10
                }
            }
        });
        /*this.meshService.test().subscribe(
        res => { 
            this.networkData = res; 
            console.log(this.networkData); 
            
            let trafficCounts = [];
            let lengths = [];  
            let protocolCounts = {}; 
            
            for (let key in this.networkData) {
                if (key != "0.0.0.0")
                    this.ips.push(key); 
                this.createProtChart(key, this.networkData); 
                trafficCounts.push(this.networkData[key].count); 
                lengths.push(this.networkData[key].length); 
            }
            console.log(this.ips); 
            this.createNetGraph();
            this.trafficChart = new Chart('traffic', {
                type: 'bar',
                data: {
                    labels: this.ips,
                    datasets: [
                        {
                            data: trafficCounts,
                            borderColor: 'blue',
                            backgroundColor: 'blue'
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
                    layout: {
                        padding: {
                            left: 100,
                            right: 100, 
                            top: 50,
                            bottom: 50
                        }
                    },
                    title: {
                        display: true,
                        text: "IP Traffic",
                        fontColor: "blue",
                        fontSize: 48,
                        padding: 20
                    },
                    events: [],
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
                            data: lengths,
                            borderColor: 'red',
                            backgroundColor: 'red'
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
                    layout: {
                        padding: {
                            left: 100,
                            right: 100, 
                            top: 50,
                            bottom: 50
                        }
                    },
                    title: {
                        display: true,
                        text: "Average Length of Packets",
                        fontColor: "red",
                        fontSize: 48,
                        padding: 20
                    },
                    events: [],
                    gridLines: {
                        color: "black",
                        lineWidth: 10
                    }
                }
            });
        }
    );*/
}}
