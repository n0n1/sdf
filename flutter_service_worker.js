'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "85c959a59644a5d85945311905561aa5",
"index.html": "3013cee30f57fe3ecdd151c3c921a6bc",
"/": "3013cee30f57fe3ecdd151c3c921a6bc",
"main.dart.js": "bcc42a4beb2402fec1efb3be22c5cf8b",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "fcb316b0c5b4cac180664d8fd01c9ec1",
"assets/images/ozon_logo.svg": "dc205f7b67f844dbb62d0dc3225ed573",
"assets/images/dosc_banner.png": "d7881a54b1175bade14a9b724de29bf8",
"assets/images/unionpay_logo.svg": "dca6bc8d19d9ee6c4b1bb1df2d0463c7",
"assets/images/market_guru_logo.svg": "df0f6e63d0a8f26aa75f40988810bc7e",
"assets/images/background_form_partners_program.png": "7a8cf66d144c3880bca3a2789f2eb0f9",
"assets/images/visa_logo.svg": "12a9c24845ac2591e9189a3386c3a984",
"assets/images/background_partners_program.png": "ecfeb776242dfe7aa84d537f5cdc1630",
"assets/images/tinkoff_logo.svg": "92915235b0a58d2d8b31b953d6a61155",
"assets/images/about_us_1.png": "17b5e9f3d1c1c7d8ec18eecf9862797c",
"assets/images/background_home.png": "62ac05ff12e03eb42b814ab2f0362425",
"assets/images/master_card_logo.svg": "aaa3ef838fe29bfabcafefa37185928a",
"assets/images/logo_colors_bg.svg": "9618e240d60f1d296107549d7b6d957b",
"assets/images/logo_colors.svg": "5534b01a66e11b1504900f6a3d312fd1",
"assets/images/mir_logo.svg": "46e454eb8f03f7be2d3e9192613c913a",
"assets/images/wbcon_logo.svg": "dab74227da8a66887460e50108684de8",
"assets/images/background_form_email.png": "287401e94f1b3d70d7aa33d207208ddf",
"assets/images/background_default.png": "7e79ac28c4e9bdaf5b5dd29e3d5462ff",
"assets/images/teams/melenteva_nina.png": "7ea916ff8b51ee7f64f512ddd95feb18",
"assets/images/teams/sokolova_polina.png": "87cf636febb8db66170b0c7d19a49443",
"assets/images/teams/lusov_vitaliy.png": "f7e515bd3618b86d3155a5ea43568d7c",
"assets/images/teams/erofeva_tatyana.png": "595bc163bb16b7682bbb32b1b75be6e4",
"assets/images/about_us_main.png": "6a4f147a75eec7a41b4b79706bd1d1e6",
"assets/images/map_background.png": "7ab388f763ff6d69e4527bde74b9f8dc",
"assets/images/logo_white.svg": "65f97a4a302633a6031aab6ccd633c34",
"assets/AssetManifest.json": "6edb7e2eae2a09ad3f97ddbc2d1dcedc",
"assets/NOTICES": "434d08297bff6086ee16a46f9ec07e32",
"assets/FontManifest.json": "469e42a701a53e2373d5083b363c22ad",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/Raleway-Medium.ttf": "2ec8557460d3a2cd7340b16ac84fce32",
"assets/fonts/Raleway-SemiBold.ttf": "8a192102b50118c45033e53ce897f103",
"assets/fonts/Raleway-Regular.ttf": "75b4247fdd3b97d0e3b8e07b115673c2",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/fonts/Yousert.ttf": "42cfa67609cdd2eed4a7ba74ed4d21ae",
"assets/fonts/Raleway-Italic.ttf": "f73026bcd64e5a5265ab616e5083cd48",
"assets/fonts/Raleway-Bold.ttf": "7802d8b27fcb19893ce6b38c0789268e",
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
