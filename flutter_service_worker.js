'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "85c959a59644a5d85945311905561aa5",
"index.html": "90af8aa1faa1a6d1c28a30ef7078df40",
"/": "90af8aa1faa1a6d1c28a30ef7078df40",
"main.dart.js": "e7480d16110c8e062e35acbb41bef681",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "fcb316b0c5b4cac180664d8fd01c9ec1",
"assets/images/trademark.jpg": "bca7ae6fd2a489a85546f430338d3ddf",
"assets/images/ozon_logo.svg": "87b5e2520d6f634ecbab2fd16c973ab6",
"assets/images/unionpay_logo.svg": "c71d0d4b50e9ff83ecda91cba9d09347",
"assets/images/market_guru_logo.svg": "2510662d94435974d05918a4d44e951c",
"assets/images/background_default_main.jpg": "25b62b5821032aebe539d108abc97a53",
"assets/images/visa_logo.svg": "14adfe22dc7a462870de00a98f000781",
"assets/images/tinkoff_logo.svg": "a0b461ecf33d59ceb18d52cf2531db56",
"assets/images/background_form_main.jpg": "34d04ee62fe1d8b045b53ecd47c6672d",
"assets/images/master_card_logo.svg": "d4aca45f084e678fdf26beb0bc3e47b1",
"assets/images/logo_colors_bg.svg": "38c9d9bb29baa79eb7bcd2bee6b6c82e",
"assets/images/logo_colors.svg": "9d24752c3fd482c46177ed613fc4de51",
"assets/images/background_default_services.jpg": "49a7f754f3291a7e37ced559e87f0d5d",
"assets/images/team_small.jpg": "58783712119b7ac4a77fd200f781f6de",
"assets/images/mir_logo.svg": "a737cf45d54e82bbacdc9faf53d2668c",
"assets/images/wbcon_logo.svg": "82ceb4504c3e0b2b921e0fdecfee955b",
"assets/images/team_large.jpg": "959372efc67ad63e319e999186359c5b",
"assets/images/background_default_partnership.jpg": "b67fbb0d52956f83986c7d54d4eacaa0",
"assets/images/teams/erofeva_tatyana.png": "eb6397737740d445717bb71432095d55",
"assets/images/marketplace.jpg": "9bc48cda5932c200da40316e1f980e7f",
"assets/images/map_background.jpg": "b7982408536585fe8f26713e4faa45d5",
"assets/images/background_default_contacts_team.jpg": "f840eeec0b9b529d665c2dd7f56a9f6d",
"assets/images/logo_white.svg": "7e70430e14d346bc4ab62daadb14b41a",
"assets/images/background_form_partnership.jpg": "66ca0561bad20b9be1862103c8bd899e",
"assets/images/create_logo.jpg": "6e9b628bc6a4bd1ee7ce8dd56a4ce833",
"assets/AssetManifest.json": "b97fb4fc15fc696d06d4f286bc6002d2",
"assets/NOTICES": "0f32a8f7b3ae33b177f46894d6dc5929",
"assets/FontManifest.json": "469e42a701a53e2373d5083b363c22ad",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/Raleway-Medium.ttf": "2ec8557460d3a2cd7340b16ac84fce32",
"assets/fonts/Raleway-SemiBold.ttf": "8a192102b50118c45033e53ce897f103",
"assets/fonts/Raleway-Regular.ttf": "75b4247fdd3b97d0e3b8e07b115673c2",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/fonts/Yousert.ttf": "42cfa67609cdd2eed4a7ba74ed4d21ae",
"assets/fonts/Raleway-Italic.ttf": "f73026bcd64e5a5265ab616e5083cd48",
"assets/fonts/Raleway-Bold.ttf": "7802d8b27fcb19893ce6b38c0789268e",
"assets/assets/politikaconf.pdf": "65f9ff179612fcd6bc0a72f5447039e6",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
