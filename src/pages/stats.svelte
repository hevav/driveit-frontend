<script>
    import {
        LineChart
    } from "@carbon/charts-svelte";
</script>

<LineChart
    data={[
        {
            group: "Организатор",
            date: new Date(2019, 0, 2, 12, 0, 0),
            value: 0
        },
        {
            group: "Организатор",
            date: new Date(2019, 0, 2, 12, 15, 0),
            value: 2
        },
        {
            group: "Организатор",
            date: new Date(2019, 0, 2, 12, 30, 0),
            value: 0
        },
        {
            group: "Организатор",
            date: new Date(2019, 0, 2, 12, 45, 0),
            value: 4
        },
        {
            group: "Организатор",
            date: new Date(2019, 0, 2, 13, 0, 0),
            value: 12
        },
        {
            group: "Организатор",
            date: new Date(2019, 0, 2, 13, 15, 0),
            value: 4
        },
        {
            group: "Организатор",
            date: new Date(2019, 0, 2, 13, 30, 0),
            value: 0
        },
        {
            group: "Организатор",
            date: new Date(2019, 0, 2, 13, 45, 0),
            value: 2
        },
        {
            group: "Организатор",
            date: new Date(2019, 0, 2, 14, 0, 0),
            value: 0
        },
    ]}
    options={{
        title: "Транспортные задержки",
        height: "400px",
        axes: {
            /*left: { mapsTo: "value" },
            bottom: { mapsTo: "group", scaleType: "labels" },*/
            bottom: {
                title: 'Временные отрезки',
                mapsTo: 'date',
                scaleType: 'time'
            },
            left: {
                title: 'Временные дельты задержек в минутах',
                mapsTo: 'value',
                scaleType: 'linear'
            }
        },
    }}
/>