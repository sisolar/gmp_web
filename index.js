let map;

// async function initMap() {

//     // The location of Uluru
//     const position = { lat: 35.717, lng: 139.731 };

//     // Request needed libraries.
//     //@ts-ignore
//     const { Map } = await google.maps.importLibrary("maps");
//     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//     // The map, centered at Uluru
//     map = new Map(document.getElementById("map"), {
//         zoom: 10,
//         center: position,
//         mapId: "DEMO_MAP_ID",
//     });

//     // The marker, positioned at Uluru
//     const marker = new AdvancedMarkerElement({
//         map: map,
//         position: position,
//         title: "Uluru",
//     });

// }

async function initMap() {
    // Map initialization position
    const centerPosition = { lat: 35.0, lng: 135.0 }; // 日本のだいたいの中心を設定

    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at the specified position
    map = new Map(document.getElementById("map"), {
        zoom: 5, // ズームレベルを調整
        center: centerPosition,
        mapId: "DEMO_MAP_ID",
    });

    // Load JSON data and create markers
    fetch('./create_data/data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(location => {
                if (location.緯度 && location.経度) { // 緯度と経度がnullでない場合のみマーカーを設置
                    const pos = { lat: location.緯度, lng: location.経度 };
                    new AdvancedMarkerElement({
                        map: map,
                        position: pos,
                        title: location.社名 // マーカーに社名を表示
                    });
                }
            });
        })
        .catch(error => console.error('Error loading the JSON data: ', error));
}

initMap();
