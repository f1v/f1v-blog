---
title: 'Visualizing Data in React With Chart.js'
date: '2020-10-12'
author: 'Ryan Deyo'
author_site: https://rdeyo.com/
---

I recently took an interest in data science as a whole and I was looking for a way to relate my career as a developer to it. Charting and graphing came to mind so I did a search and [chart.js](https://www.chartjs.org/) caught my eye. With just a few simple settings, I was able to get a few examples running and displaying data. If you're looking for a quick and simple way display data in your project, then this is the library to use.

## Installation

Chart.js utilizes different ways to install such as Bower and CDN, but with React we will use npm:

```bash
npm install chart.js --save
```

## Usage

Import:

```
import { Chart } from 'chart.js';
```

On a basic HTML webpage we would normally establish a canvas element and retrieve it from the DOM. With React we will need to set up a ref in the chart instance using `React.createRef()`:

```jsx
chartRef = React.createRef();

componentDidMount() {
  const ratingChartRef = this.chartRef.current.getContext('2d');
  
  new Chart(ratingChartRef, {
    type: 'line',
    data: {
      labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      datasets: [
        {
          label: 'Blitz',
          data: [2400, 2350, 2370, 2290, 2370],
          backgroundColor: 'red'
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Player Rating'
      },
    }
  })
}
```

In this example we are using a line graph to measure a player's chess elo rating over time. We are initializing the `new Chart` once the component mounts and preparing the connection to the canvas element by calling `.getContext('2d')`. 

Other things to notice is the ease of changing the type in the first property, and being able to display multiple datasets by including another element in the dataset array. Then there are options that allow for further manipulation. See further reading for more info.

Then we create the canvas inside the render method:

```jsx
render() {
  return (
    <div className='rating-chart'>
      <canvas id='ratingChart' ref={this.chartRef} height="30" width="80" />
    </div>
  )
}
```

## Competition

There are other libraries that can visualize data like this. D3 has a bit more options at it's disposal for visualizing and manipulating data which. Chart.js did not provide this. The main comparison between these two libaries is that `D3` uses SVG and `Chart` uses canvas. Performance wise, canvas works better than SVG with smaller surface area or if a large number of objects are being manipulated.

So if you're looking for a fast and simple way to only display data, Chart.js is the way to go.

## Further Reading

- [Chart.js Website](https://www.chartjs.org/)
- [SVG vs. Canvas](https://medium.com/@benisinca/svg-vs-canvas-92938aff799a)