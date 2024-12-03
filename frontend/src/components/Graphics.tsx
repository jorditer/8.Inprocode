import { GraphicsProps } from "../types/GraphicProps"
import { useState } from "react"
import { AgCharts } from 'ag-charts-react'

const Graphics = ({ events }: GraphicsProps) => {
  const [chartOptionsBand] = useState({
		height: 400,
    data: events,
    series: [
      {
        type: 'line',
        xKey: '_id',
        yKey: 'price',
        title: 'Event Prices',
      }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
				title: "Event",
        label: {
          formatter: (params: any) => {
            const event = events.find(e => e._id === params.value);
            return event?.name || '';
          }
        }
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Price (€)'
        },
				label: {
					formatter: (params: any) => `${params.value} €`
				}
      }
    ]
  });

const [chartOptionsLocation] = useState({
  height: 400,
  data: events,
  series: [
    {
      type: 'bar',
      xKey: 'location',
      yKey: 'price',
      title: 'Event Prices',
    }
  ],
  axes: [
    {
      type: 'category',
      position: 'bottom',
      title: "Location",
      label: {
        formatter: (params: any) => {
          const event = events.find(e => e.location === params.value);
          return event?.location || '';
        }
      }
    },
    {
      type: 'number',
      position: 'left',
      title: {
        text: 'Price (€)'
      },
      label: {
        formatter: (params: any) => `${params.value} €`
      }
    }
  ]
});

  return (
    <div className="ms-6 h-screen`">
      <h1 className="ms-0 ps-0">Graphics</h1>
			<h2 className="ms-4">Price per Band</h2>
			<div className="border-2 w-3/4 mx-auto ">
    	  <AgCharts options={chartOptionsBand} />
			</div>
			<h2 className="ms-4">Price per Location</h2>
			<div className="border-2 w-3/4 mx-auto ">
    	  <AgCharts options={chartOptionsLocation} />
			</div>
    </div>
  );
}

export default Graphics;