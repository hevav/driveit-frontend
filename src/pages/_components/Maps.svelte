<script>
    export let onLoad
    let width, height

    let docks = []
    let ships = []
    let lines = []

    let elem, ctx
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    let zoom = 1, ox = 0, oy = 0;
    let utmzx = 0.146107, utmox = -58719.1, utmzy = -0.140703, utmoy = 869780
    let a = 6378137, eccSquared = 0.00669438;
    let eccPrimeSquared = (eccSquared) / (1 - eccSquared);
    let shipImage = new Image(); shipImage.src = "/static/ship.svg"
    let stopPoint = new Image(); stopPoint.src = "/static/stop.svg"
    let map = new Image(undefined, undefined); map.src = "/static/map.svg"
    let aspectRatio = width/height, imgWidth, imgHeight;
    map.onload = function () {
        imgWidth = map.naturalWidth
        imgHeight = map.naturalHeight
        drawMap()
    }

    const drawImage = function(img, x, y, dimx, dimy, rot) {
        let ix = (x - ox) * zoom;
        let iy = (y - oy) * zoom
        ctx.setTransform(1,0,0,1,ix,iy);
        if (rot) ctx.rotate(rot)
        ctx.drawImage(img, -dimx/2, -dimy/2, dimx, dimy)
        ctx.setTransform(1,0,0,1,0,0);
    }

    const drawMap = function () {
        map.width = ctx.canvas.width
        map.height = ctx.canvas.height
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(map, ox, oy, ctx.canvas.width / zoom, ctx.canvas.height / zoom, 0, 0, ctx.canvas.width, ctx.canvas.height)
        docks.forEach(dock => {
            let stopPointDim = Math.min(28, 14 * Math.sqrt(zoom));
            drawImage(stopPoint, dock.x, dock.y, stopPointDim, stopPointDim)
        })
        ships.forEach(ship => {
            let shipDimX = Math.min(28, 14 * Math.sqrt(zoom));
            let shipDimY = shipDimX / 1.62;
            drawImage(shipImage, ship.x, ship.y, shipDimX, shipDimY, ship.rot)
        })
        lines.forEach(line => {
            ctx.strokeStyle = "#000"
            ctx.beginPath()
            ctx.moveTo((line.sx - ox) * zoom, (line.sy - oy) * zoom)
            ctx.lineTo((line.dx - ox) * zoom, (line.dy - oy) * zoom)
            ctx.stroke()
        })
    }

    const toRadians = function (deg) {
        return deg * Math.PI / 180;
    };

    const latLongToMap = function (latitude, longitude) {
        let LongTemp = longitude;
        let LatRad = toRadians(latitude);
        let LongRad = toRadians(LongTemp);
        let ZoneNumber

        if (LongTemp >= 8 && LongTemp <= 13 && latitude > 54.5 && latitude < 58) {
            ZoneNumber = 32;
        } else if (latitude >= 56.0 && latitude < 64.0 && LongTemp >= 3.0 && LongTemp < 12.0) {
            ZoneNumber = 32;
        } else {
            ZoneNumber = Math.round(((LongTemp + 180) / 6) + 1);

            if (latitude >= 72.0 && latitude < 84.0) {
                if (LongTemp >= 0.0 && LongTemp < 9.0) {
                    ZoneNumber = 31;
                } else if (LongTemp >= 9.0 && LongTemp < 21.0) {
                    ZoneNumber = 33;
                } else if (LongTemp >= 21.0 && LongTemp < 33.0) {
                    ZoneNumber = 35;
                } else if (LongTemp >= 33.0 && LongTemp < 42.0) {
                    ZoneNumber = 37;
                }
            }
        }

        let LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
        let LongOriginRad = toRadians(LongOrigin);


        let N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
        let T = Math.tan(LatRad) * Math.tan(LatRad);
        let C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
        let A = Math.cos(LatRad) * (LongRad - LongOriginRad);

        let M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad
            - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad)
            + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad)
            - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

        let UTMEasting = (0.9996 * N * (A + (1 - T + C) * A * A * A / 6
            + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120)
            + 500000.0);

        let UTMNorthing = (0.9996 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24
            + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720)));
        if (latitude < 0) UTMNorthing += 10000000.0;
        return { x: (Math.round(UTMEasting) * utmzx + utmox), y: (Math.round(UTMNorthing) * utmzy + utmoy) }
    }

    const mouseDownHandler = function (e) {
        if (e.touches) e = e.touches[0]
        clickHandler(e)
        pos = {
            left: ox,
            top: oy,
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('touchmove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        document.addEventListener('touchend', mouseUpHandler);

        elem.style.cursor = 'grabbing';
    };

    const changeOffset = function (nox, noy) {
        let pix = imgWidth - (width / zoom);
        ox = Math.max(0, Math.min(pix, nox))
        let piy = imgHeight - (width / aspectRatio / zoom);
        oy = Math.max(0, Math.min(piy, noy))
    }

    const mouseMoveHandler = function (e) {
        if (e.touches) e = e.touches[0]
        const dx = (e.clientX - pos.x) / zoom;
        const dy = (e.clientY - pos.y) / zoom;
        let nox = pos.left - dx;
        let noy = pos.top - dy;
        changeOffset(nox, noy);
        drawMap()
    };

    const mouseUpHandler = function () {
        elem.style.cursor = 'grab';
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('touchmove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        document.removeEventListener('touchend', mouseUpHandler);
    };

    const findElementByCoords = function (x, y) {
        let rx = x/zoom + ox, ry = y/zoom + oy;

        let found;
        [...ships, ...docks].forEach(element => {
            if (Math.abs(element.x - rx) < 8 && Math.abs(element.y - ry) < 8) {
                found = element;
                return
            }
        })

        return found
    }

    const hoverHandler = function(e) {
        let element = findElementByCoords(e.offsetX, e.offsetY)
        if (element && element.onHover) element.onHover(e) 
        if (element && element.onClick) elem.style.cursor = "pointer"
        else elem.style.cursor = "grab" 
    }


    const clickHandler = function(e) {
        let element = findElementByCoords(e.offsetX, e.offsetY)
        if (element && element.onClick) element.onClick(e) 
    }

    const wheelHandler = function (e) {
        let centerX = e.offsetX / zoom + ox
        let centerY = e.offsetY / zoom + oy
        if (e.deltaY > 0 && zoom >= 0.5) {
            zoom *= 0.9
        } else if (e.deltaY < 0 && zoom <= 10) {
            zoom *= 1.1
        }
        changeOffset(centerX - e.offsetX / zoom, centerY - e.offsetY / zoom)
        drawMap()
    };

    export const zoomToXY = function (x, y, minZoom) {
        if (zoom < minZoom) {
            zoom = minZoom
        }
        changeOffset(x, y)
        drawMap()
    }

    export const zoomToLatLon = function (lat, lon, minZoom) {
        let coords = latLongToMap(lat, lon)
        return zoomToXY(coords.x, coords.y, minZoom) 
    }

    export const addShipXY = function (id, x, y, rot, onHover, onClick) {
        localClearShip(id)
        ships.push({id, x, y, rot, onHover, onClick})    
        drawMap()
    }

    export const addShipLatLon = function (id, lat, lon, rot, onHover, onClick) {
        let coords = latLongToMap(lat, lon)
        addShipXY(id, coords.x, coords.y, rot, onHover, onClick)    
    }

    export const clearShips = function () {
        ships = []
        drawMap()
    }


    const localClearShip = function (id) {
        let index = ships.findIndex((ship) => ship.id === id)
        if (index !== -1) {
            ships.splice(index, 1)
        }
    }


    export const clearShip = function (id) {
        localClearShip(id)
        drawMap()
    }

    export const addDockXY = function (x, y, onHover, onClick) {
        docks.push({x, y, onHover, onClick})    
        drawMap()
    }

    export const addDockLatLon = function (lat, lon, onHover, onClick) {
        let coords = latLongToMap(lat, lon)
        addDockXY(coords.x, coords.y, onHover, onClick)    
    }

    export const clearDocks = function () {
        docks = []
        drawMap()
    }

    export const addLineXY = function (sx, sy, dx, dy) {
        lines.push({sx, sy, dx, dy})    
        drawMap()
    }

    export const addLineLatLon = function (slat, slon, dlat, dlon, onHover) {
        let scoords = latLongToMap(slat, slon)
        let dcoords = latLongToMap(dlat, dlon)
        addLineXY(scoords.x, scoords.y, dcoords.x, dcoords.y)
    }

    export const clearLines = function () {
        lines = []
        drawMap()
    }

    const onCanvas = function(e) {
        elem = e
        elem.width = width = elem.clientWidth; elem.height = elem.clientHeight
        aspectRatio = elem.width / elem.height
        ctx = elem.getContext('2d');
        drawMap()
        if (onLoad) {
            onLoad()
        }
    }
</script>

<canvas bind:this={elem} on:mousedown={mouseDownHandler} on:touchstart={mouseDownHandler} on:wheel={wheelHandler}
    on:mousemove={hoverHandler} use:onCanvas>
</canvas>

<style>
    canvas {
        width: 100%;
        height: 100%;
        user-drag: none;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor: grab;
    }
</style> 