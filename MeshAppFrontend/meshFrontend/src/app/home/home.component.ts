import { Component, OnInit } from '@angular/core';
import { MeshService } from '../mesh.service'; 
import { Chart } from 'chart.js'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public testChart:any = []; 

  constructor(private meshService: MeshService) { }

  ngOnInit() {
  }

  test() {
      
      this.meshService.test().subscribe(
          res => {
            console.log(res.data); 
            //res.data = res.data.split('{'); 
            //let sentData = res.data.sentPackets; 
            //let receivedData = res.data.receivedPackets;
            let array = []; 
            let sentPackets = []; 
            let receivedPackets = []; 
            let chartData = []; 
            let chartLabels = [];

           /* for (let key in sentData) {
                sentPackets.push(sentData[key]);  
            }
            for (let key in receivedData) {
                receivedPackets.push(receivedData[key]); 
            }
            sentPackets.sort(function(a, b) {
                return b[1] - a[1]; 
            });
            receivedPackets.sort(function(a, b) {
                return b[1] - a[1]; 
            });*/


            /*
            for (let ip in res.data) {
                array.push([ip, res.data[ip]]);
            }
            console.log(array); 


            array.sort(function(a, b) {
                return b[1] - a[1];
            })
            for (let i = 0; i < 10; i++) {
                chartData.push(array[i][1]); 
                chartLabels.push(array[i][0]);
            }
            console.log(chartData.reverse());
            console.log(chartLabels.reverse()); 

            this.testChart = new Chart('myChart', {
                type: 'bar',
                data: {
                    labels: chartLabels,
                    datasets: [
                        {
                            data: chartData,
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
                        text: "Test Data",
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

            }) */
        }
    );
}}
