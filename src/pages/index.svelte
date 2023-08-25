<script>
    import {
        Tabs, Tab, TabContent,
        TextInput
    } from "carbon-components-svelte";
	import {api} from "./api";

    import Maps from "./_components/Maps.svelte"

    import stopIcon from "./_components/assets/gtfs/stop-icon.svg"
    import shipIcon from "./_components/assets/gtfs/ship-icon.svg"
    
    // TABS / STOP / ROUTE / SHIP
    let state = "TABS";

    let addDockLatLon, zoomToLatLon, addShipLatLon, clearShips;
    
    let selectedStop = {};
    const selectStop = (stop) => {
        state = "STOP";
        selectedStop = stop.id;
        zoomToLatLon(stop.lat, stop.lon, 2)
    }

    let selectedRoute = {};
    const selectRoute = (routeId) => {
        state = "ROUTE";
        selectedRoute = routeId;
    }

    let selectedShip = {};
    const selectShip = (shipId) => {
        state = "SHIP";
        selectedShip = shipId
    }

    const onMapLoad = () => {
        api.stop.listList({page: 1, pageSize: 10000}).then(answer => {
            answer.data.items.forEach(stop => {
            addDockLatLon(stop.lat, stop.lon, (e) => {
                
            }, () => {
                selectStop(stop)
            })
        })
        })
    }

    import { FeedMessage } from "./api/gtfs-specification";
    import { onMount, onDestroy } from "svelte";
    const toRadians = function (deg) {
        return deg * Math.PI / 180;
    };

    let ws;

    onMount(() => {
        ws = new WebSocket("wss://api.noname.to");

        ws.onmessage = (message) => {
            let arrayBuffer;
            let fileReader = new FileReader()
            fileReader.onload = (event) => {
                arrayBuffer = event.target.result;
                let a = FeedMessage.fromBinary(new Uint8Array(arrayBuffer))
                a.entity.forEach(feed => {
                addShipLatLon(feed.vehicle.vehicle.id,
                feed.vehicle.position.latitude,
                feed.vehicle.position.longitude,
                toRadians(feed.vehicle.bearing), null, () => {
                    selectShip(feed.vehicle.vehicle.id)
                })
            })
        }
        fileReader.readAsArrayBuffer(message.data)
        }
    })

    onDestroy(() => {
        console.log()
        ws.close()
    })

    let stopInput, routeInput, shipInput;
</script>

<div class="min-h-fit md:max-h-[32rem] grid grid-cols-12">
    <div class="min-h-fit flex flex-col col-span-12 lg:col-span-3 bg-gray-100">
        {#if state === "TABS"}
            <Tabs autoWidth>
                <Tab label="Корабли" />
                <Tab label="Маршруты" />
                <Tab label="Остановки" />
                <svelte:fragment slot="content">
                    <TabContent>
                        <div class="flex flex-col">
                            <TextInput placeholder="Поиск кораблей"  bind:value={shipInput}/>
                            <div class="flex flex-col item-wrapper mt-4">
                                <div class="flex flex-col">
                                    {#await api.ship.listList({page: 1, query: shipInput, pageSize: 10000})}
                                        Загрузка..
                                    {:then answer}
                                    {#each answer.data.items as ship}
                                        <button class="item-container" on:click={() => selectShip(ship.id)}>
                                            <img class="item-icon ship-icon" src={shipIcon} alt="ship-icon" />
                                            <div class="item-title">
                                                <p class="font-medium">{ship.name}</p>
                                            </div>
                                        </button>
                                    {/each}
                                    {/await}
                                </div>
                            </div>
                        </div>
                    </TabContent>
                    <TabContent>
                        <div class="flex flex-col">
                            <TextInput placeholder="Поиск маршрутов" bind:value={routeInput} />
                            <div class="flex flex-col item-wrapper mt-4">
                                <div class="flex flex-col">
                                    {#await api.route.listList({page: 1, query: routeInput, pageSize: 10000})}
                                        Загрузка..
                                    {:then answer}
                                    {#each answer.data.items as route}
                                        <button class="item-container" on:click={() => selectRoute(route.id)}>
                                            <div class="px-1.5 bg-[#0293e4]">
                                                <p class="font-medium text-sm text-white">{route.shortName}</p>
                                            </div>
                                            <div class="item-title">
                                                <p class="font-medium">{route.longName}</p>
                                            </div>
                                        </button>
                                    {/each}
                                    {/await}
                                </div>
                            </div>
                        </div>
                    </TabContent>
                    <TabContent>
                        <div class="flex flex-col">
                            <TextInput placeholder="Поиск остановок" bind:value={stopInput}/>
                            <div class="flex flex-col item-wrapper mt-4">
                                <div class="flex flex-col">
                                    {#await api.stop.listList({page: 1, query: stopInput, pageSize: 10000})}
                                        Загрузка..
                                    {:then answer}
                                    {#each answer.data.items as stop}
                                    <button class="item-container" on:click={() => selectStop(stop)}>
                                        <img class="item-icon stop-icon" src={stopIcon} alt="stop-icon" />
                                        <div class="item-title">
                                            <p class="font-medium">{stop.name}</p>
                                        </div>
                                    </button>
                                    {/each}
                                    {/await}
                                </div>
                            </div>
                        </div>
                    </TabContent>
                </svelte:fragment>
            </Tabs>
        {:else if state === "STOP"}
            <div class="flex flex-col p-4">
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a class="text-xs text-gray-600 mb-2 cursor-pointer"
                    on:click={() => state = "TABS"}>← ВЕРНУТЬСЯ НАЗАД</a>

                {#await api.stop.stopDetail(selectedStop)}
                    Загрузка..
                {:then answer}
                <img class="item-icon stop-icon mt-4 mb-2" src={stopIcon} alt="stop-icon" />
                <h4 class="font-medium">{ answer.data.name }</h4>
                <p class="text-gray-500">Остановка водного трамвайчика</p>

                <div class="flex flex-col mt-6">
                    <h5>Маршруты</h5>
                    <div class="flex items-center gap-x-2 mt-2">
                        {#each answer.data.routes as route}
                        <div class="px-1.5 bg-[#0293e4] cursor-pointer">
                            <p class="font-medium text-sm text-white">{route}</p>
                        </div>
                        {/each}
                        {#if answer.data.routes.length === 0}
                            Маршрутов нет
                        {/if}
                    </div>
                </div>

                <h5 class="mt-8 mb-2">Расписание</h5>
                <div class="flex flex-col item-wrapper">
                    <div class="flex flex-col">
                        {#each answer.data.schedule as schedule}
                        <button class="item-container">
                            <img class="item-icon ship-icon" src={shipIcon} alt="ship-icon" />
                            <div class="item-title">
                                <p class="font-medium">Организатор</p>
                                <p class="text-xs text-gray-500">
                                    <span class="whitespace-nowrap">МАРШРУТ «{schedule.routeName}» •</span>
                                    <span class="whitespace-nowrap">ПОЕЗДКА №{schedule.tripId}</span>
                                </p>
                            </div>
                            <div class="item-data">
                                <p>{schedule.time}</p>
                            </div>
                        </button>
                        {/each}
                    </div>
                </div>
                {/await}
            </div>
        {:else if state === "ROUTE"}
            <div class="flex flex-col p-4">
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a class="text-xs text-gray-600 mb-2 cursor-pointer"
                    on:click={() => state = "TABS"}>← ВЕРНУТЬСЯ НАЗАД</a>

              {#await api.route.routeDetail(selectedRoute)}
                Загрузка..
                {:then answer}
                <div class="px-2 bg-[#0293e4] max-w-max my-2">
                    <p class="font-bold text-md text-white">{answer.data.shortName}</p>
                </div>
                <h4 class="font-medium">
                    { answer.data.longName }
                </h4>
                <p class="text-gray-500">
                    { answer.data.longName }
                </p>

                <h5 class="mt-6 mb-2">Остановки</h5>
                <div class="flex flex-col item-wrapper">
                    <div class="flex flex-col">
                        {#each answer.data.stops as stop}
                            <button class="item-container" on:click={() => selectStop(stop.id)} >
                                <img class="item-icon stop-icon" src={stopIcon} alt="stop-icon"/>
                                <div class="item-title">
                                    <p class="font-medium">{stop.name}</p>
                                </div>
                            </button>
                        {/each}
                    </div>
                </div>
                {/await}
            </div>
        {:else if state === "SHIP"}
            <div class="flex flex-col p-4">
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a class="text-xs text-gray-600 mb-2 cursor-pointer"
                    on:click={() => state = "TABS"}>← ВЕРНУТЬСЯ НАЗАД</a>

                {#await api.ship.shipDetail(selectedShip)}
                    Загрузка..
                {:then answer}
                <img class="item-icon ship-icon mt-4 mb-2" src={shipIcon} alt="ship-icon" />
                <h4 class="font-medium">
                    { answer.data.name }
                </h4>

                <h5 class="mt-6 mb-2">Расписание</h5>
                <div class="flex flex-col item-wrapper">
                    <div class="flex flex-col">
                        {#each answer.data.schedule as schedule}
                        <button class="item-container">
                            <img class="item-icon stop-icon" src={stopIcon} alt="stop-icon" />
                            <div class="item-title">
                                <p class="font-medium">{answer.data.name}</p>
                                <p class="text-xs text-gray-500">
                                    <span class="whitespace-nowrap">МАРШРУТ «{schedule.stopName}» •</span>
                                    <span class="whitespace-nowrap">ПОЕЗДКА №{schedule.id}</span>
                                </p>
                            </div>
                            <div class="item-data">
                                <p>{schedule.time}</p>
                            </div>
                        </button>
                        {/each}
                    </div>
                </div>
                {/await}

                
            </div>
        {:else}
            неизвестное состояние
        {/if}
    </div>
    <div class="min-h-[28rem] col-span-12 lg:col-span-9">
        <div class="map-refer">
            <Maps bind:addDockLatLon={addDockLatLon}
             bind:zoomToLatLon={zoomToLatLon}
             bind:clearShips={clearShips}
             bind:addShipLatLon={addShipLatLon} 
              onLoad={onMapLoad}/>
        </div>
    </div>
</div>

<style>
    .map-refer {
        width: 100%;
        height: 100%;

        /* background: url('/static/german-map.jpeg'); */
        /* background-size: cover; */
        background: #1e2631;
    }

    .item-icon {
        width: 22px;
        height: 22px;
        padding: 2px;
        box-sizing: border-box;
    }

    .item-icon.stop-icon {
        background-color: #0085FF;
    }
    .item-icon.ship-icon {
        background-color: #12848c;
    }
    .item-icon.route-icon {
        background-color: #be31cd;
    }

    .item-container {
        display: flex;
        height: 56px;
        align-items: center;
        transition: .3s;
        padding: 0 16px;
        background-color: rgba(0,0,0,.0);
    }

    .item-container:hover {
        background-color: rgba(0,0,0,.15);
    }

    .item-container .item-title {
        display: flex;
        flex-direction: column;
        align-items: start;
        text-align: left;
        margin: 0 16px;
    }

    .item-container .item-data {
        margin-left: auto;
        display: flex;
        flex-direction: column;
    }

    .item-wrapper {
        position: relative;
        overflow-y: auto;
        max-height: 24rem;
        margin-left: -16px;
        margin-right: -16px;
    }
</style>