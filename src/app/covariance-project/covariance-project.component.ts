import { Component, OnInit } from '@angular/core';
import { PrimaryComponentAnalysis } from './scripts/PrimaryComponentAnalysis';
declare var Plotly: any;

@Component({
  selector: 'covariance-project',
  templateUrl: './covariance-project.component.html',
  styleUrls: ['./covariance-project.component.css']
})
export class CovarianceProjectComponent implements OnInit {
  public data;
  public pca: PrimaryComponentAnalysis
  public state: {
    title: string,
    beforeData : {
      title: string,
      matrix: Array<Array<number>>
    },
    afterData : {
      title: string,
      matrix: Array<Array<number>>
    },
    covData : {
      title: string,
      matrix: Array<Array<number>>
    },
  }

  constructor() {
    this.data = this.genData(100, false);
    this.pca = new PrimaryComponentAnalysis(),
    this.state = {
        title : "Dimensionality Reduction",
        beforeData : {
            title : "Gathered Data",
            matrix : JSON.parse(JSON.stringify(this.data))
        },
        afterData : {
            title : "Processed Data",
            matrix : this.pca.pca(JSON.parse(JSON.stringify(this.data)), 2, 1000)
        },
        covData : {
            title : "Covariance Matrix",
            matrix : this.pca.cov(JSON.parse(JSON.stringify(this.data)))
        }
    };
  }
  ngOnInit() {
    this.loadPage();
  }

  getBeforeDataSection(info: {title: string, matrix: Array<Array<number>>}) {
      let beforeDataSection = document.createElement('section');
          beforeDataSection.setAttribute('id', 'beforeDataSection');
          beforeDataSection.setAttribute('class', 'dataSection');

      let beforeDataTitle = document.createElement('h2');
          beforeDataTitle.setAttribute('class', 'dataHeader');
          beforeDataTitle.appendChild(document.createTextNode(info.title));

      let beforeDataMatrixWrapper = document.createElement('div');
          beforeDataMatrixWrapper.setAttribute('id', 'beforeDataMatricesWrapper');
          beforeDataMatrixWrapper.setAttribute('class', 'doubleWrapper');
          beforeDataMatrixWrapper.appendChild(this.createInputMatrix(this.pca.roundMatrix(info.matrix), "X", false));

      beforeDataSection.appendChild(beforeDataTitle);
      beforeDataSection.appendChild(beforeDataMatrixWrapper);

      this.plot3dMatrix(info.matrix);
      return { section : "beforeMatrix", content : beforeDataSection };
  }
  getAfterDataSection(info: {title: string, matrix: Array<Array<number>>}) {
      let afterDataSection = document.createElement('section');
          afterDataSection.setAttribute('id', 'afterDataSection');
          afterDataSection.setAttribute('class', 'dataSection');

      let afterDataTitle = document.createElement('h2');
          afterDataTitle.setAttribute('class', 'dataHeader');
          afterDataTitle.appendChild(document.createTextNode(info.title));

      let afterDataMatrixWrapper = document.createElement('div');
          afterDataMatrixWrapper.setAttribute('id', 'afterDataMatrixWrapper');
          afterDataMatrixWrapper.setAttribute('class', 'doubleWrapper');
          afterDataMatrixWrapper.appendChild(this.createInputMatrix(this.pca.roundMatrix(info.matrix), "X'", true));

      afterDataSection.appendChild(afterDataTitle);
      afterDataSection.appendChild(afterDataMatrixWrapper);

      this.plot2dMatrix(info.matrix);
      return { section : "afterMatrix", content : afterDataSection };
  }
  getCovMatrixSection(info: {title: string, matrix: Array<Array<number>>}) {
      let covMatrixSection = document.createElement('section');
          covMatrixSection.setAttribute('id', 'covMatrixSection');
          covMatrixSection.setAttribute('class', 'dataSection');

      let covMatrixTitle = document.createElement('h2');
          covMatrixTitle.setAttribute('class', 'dataHeader');
          covMatrixTitle.appendChild(document.createTextNode(info.title));

      let covMatrixWrapper = document.createElement('div');
          covMatrixWrapper.setAttribute('id', 'covMatrixWrapper');
          covMatrixWrapper.setAttribute('class', 'doubleWrapper');
          covMatrixWrapper.appendChild(this.createInputMatrix(this.pca.roundMatrix(info.matrix), "&Sigma;", true));

      covMatrixSection.appendChild(covMatrixTitle);
      covMatrixSection.appendChild(covMatrixWrapper);

      return { section : "covMatrix", content : covMatrixSection };
  }
  createInputMatrix(matrix: Array<Array<number>>, title: string, disabled: boolean) {
      let inputWrapper = document.createElement('div');
      inputWrapper.setAttribute('class', 'matrixWrapper');

      let matrixTitle = document.createElement('div');
      matrixTitle.setAttribute('class', 'matrixTitle');
      matrixTitle.innerHTML = title + " = ";

      let inputMatrix = document.createElement('div');
      inputMatrix.setAttribute('id', 'inputMatrix');
      inputMatrix.setAttribute('class', 'matrix');
      let cols = "0.5fr ";
      for (let n = 0; n < matrix[0].length; n++) {
          cols += "1fr ";
      }
      cols += "0.5fr";
      inputMatrix.style.gridTemplateColumns = cols;
      for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[i].length + 2; j++) {
              if (j == 0 || j == matrix[i].length + 1) {                    
                  let inputItem = document.createElement('div');
                  inputItem.setAttribute('class', 'matrixEntry');
                  inputItem.style.width = "10px";
                  if (i == 0) inputItem.style.borderTopWidth = "2px";
                  if (i == matrix.length - 1) inputItem.style.borderBottomWidth = "2px";
                  if (j == 0) inputItem.style.borderLeftWidth = "2px";
                  if (j == matrix[i].length + 1) inputItem.style.borderRightWidth = "2px";
                  inputMatrix.appendChild(inputItem);
              } else {
                  let inputItem = document.createElement('input');
                  if (disabled) inputItem.setAttribute('disabled', 'true');
                  inputItem.setAttribute('type', 'number');
                  inputItem.setAttribute('id', 'input' + i + (j - 1));
                  inputItem.setAttribute('class', 'matrixEntry');
                  inputItem.onchange = (event) => {this.reloadResultMatrix(event)};
                  inputItem.setAttribute('value', matrix[i][j - 1].toString());
                  inputMatrix.appendChild(inputItem);
              }
          }
      }
      inputWrapper.appendChild(matrixTitle);
      inputWrapper.appendChild(inputMatrix);
      return inputWrapper;
  }
  reloadResultMatrix(event: any) {
      let row = event.target.id.charAt(event.target.id.length - 2);
      let column = event.target.id.charAt(event.target.id.length - 1);

      this.state.beforeData.matrix[row][column] = Number(event.target.value);
      this.state.covData.matrix = this.pca.cov(JSON.parse(JSON.stringify(this.state.beforeData.matrix)));
      this.state.afterData.matrix = this.pca.pca(JSON.parse(JSON.stringify(this.state.beforeData.matrix)), 2, 10);

      let covMatrixSection = this.getCovMatrixSection(this.state.covData);
      let afterDataSection = this.getAfterDataSection(this.state.afterData);
      let covMatrixNode = document.getElementById(covMatrixSection.section);
      covMatrixNode!.removeChild(covMatrixNode!.firstElementChild!);
      covMatrixNode!.appendChild(covMatrixSection.content);
      let afterMatrixNode = document.getElementById(afterDataSection.section);
      afterMatrixNode!.removeChild(afterMatrixNode!.firstElementChild!);
      afterMatrixNode!.appendChild(afterDataSection.content);
      this.plot3dMatrix(this.state.beforeData.matrix);
  }
  genData(numSamples: number, perfect: boolean) {
      let data = [];
      for (let i = 0; i < numSamples; i++) {
          let studying = Math.floor((Math.random() * 10));
          let coffee = Math.floor((Math.random() * 10));
          let grade = ((studying*2 + coffee*2) + 60) * (perfect ? ((Math.random() * .4) + .7) : 1);
          let sample = [grade, coffee, studying];
          data.push(sample);
      }
      return data;
  }
  plot3dMatrix(matrix: Array<Array<number>>) {
    let trace1: any = {
        x: this.pca.getColumn(matrix, 0), 
        y: this.pca.getColumn(matrix, 1),
        z: this.pca.getColumn(matrix, 2), 
        mode: 'markers',
            marker: {
            size: 12,
            line: {
                color: 'rgba(217, 217, 217, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        },
        type: 'scatter3d'
    };
    let graphData: any = [trace1];
    let layout: any = {
        paper_bgcolor: "lavender",
        dragmode: false,
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        },
        scene: {
            aspectmode:'cube',
            xaxis:{
                title: 'Grade',
                backgroundcolor: "rgb(200, 200, 230)",
                gridcolor: "rgb(255, 255, 255)",
                showbackground: true,
                zerolinecolor: "rgb(255, 255, 255)",
            },
            yaxis:{
                title: 'Coffee Consumed (Cups)',
                backgroundcolor: "rgb(230, 200,230)",
                gridcolor: "rgb(255, 255, 255)",
                showbackground: true,
                zerolinecolor: "rgb(255, 255, 255)"
            },
            zaxis:{
                title: 'Time Studied (Hours)',
                backgroundcolor: "rgb(230, 230,200)",
                gridcolor: "rgb(255, 255, 255)",
                showbackground: true,
                zerolinecolor: "rgb(255, 255, 255)"
            },
        },
    };
    Plotly.newPlot('matrix3d', graphData, layout, {responsive: true});
  }
  plot2dMatrix(matrix: Array<Array<number>>) {
    let trace2: any = {
        x: this.pca.getColumn(matrix, 0),
        y: this.pca.getColumn(matrix, 1),
        mode: 'markers',
        type: 'scatter',
        name: 'Team B',
        text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
        marker: { size: 12 }
    };
    let graphData: any = [ trace2 ];
    let layout = {
        paper_bgcolor: "lavender",
        xaxis: {
          title: {
            text: 'Grade (Normalized)',
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'
            }
          },
        },
        yaxis: {
          title: {
            text: 'Coffee AND Studying',
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'
            }
          }
        }
    };
    Plotly.newPlot('matrix2d', graphData, layout, {responsive: true});
  }
  loadPage() {
    let beforeDataSection = this.getBeforeDataSection(this.state.beforeData);
    let covMatrixSection = this.getCovMatrixSection(this.state.covData);
    let afterDataSection = this.getAfterDataSection(this.state.afterData);
    document.getElementById(beforeDataSection.section)!.appendChild(beforeDataSection.content);
    document.getElementById(covMatrixSection.section)!.appendChild(covMatrixSection.content);
    document.getElementById(afterDataSection.section)!.appendChild(afterDataSection.content);
  }
}