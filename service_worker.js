this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/jeepney_jump/',
        '/jeepney_jump/index.html',
        '/jeepney_jump/assets/style.css',
        '/jeepney_jump/lib/index.js',
        '/jeepney_jump/lib/asset_manager.js',
        '/jeepney_jump/lib/audio_player.js',
        '/jeepney_jump/lib/background_object.js',
        '/jeepney_jump/lib/bonus.js',
        '/jeepney_jump/lib/game_object.js',
        '/jeepney_jump/lib/game.js',
        '/jeepney_jump/lib/jeepney.js',
        '/jeepney_jump/lib/obstacle.js',
        '/jeepney_jump/assets/images/bg.jpg',
        '/jeepney_jump/assets/images/github.png',
        '/jeepney_jump/assets/images/heart.png',
        '/jeepney_jump/assets/images/restart.png',
        '/jeepney_jump/assets/images/start.png',
        '/jeepney_jump/assets/images/background/cloud.png',
        '/jeepney_jump/assets/images/background/ground.png',
        '/jeepney_jump/assets/images/background_objects/bank.png',
        '/jeepney_jump/assets/images/background_objects/church.png',
        '/jeepney_jump/assets/images/background_objects/green_building.png',
        '/jeepney_jump/assets/images/background_objects/hospital.png',
        '/jeepney_jump/assets/images/background_objects/mall.png',
        '/jeepney_jump/assets/images/background_objects/palm_tree.png',
        '/jeepney_jump/assets/images/background_objects/pink_building.png',
        '/jeepney_jump/assets/images/background_objects/videoke_bar.png',
        '/jeepney_jump/assets/images/bonuses/lumpia.png',
        '/jeepney_jump/assets/images/bonuses/mango.png',
        '/jeepney_jump/assets/images/jeepney/jeepney_damage_1.png',
        '/jeepney_jump/assets/images/jeepney/jeepney_damage_2.png',
        '/jeepney_jump/assets/images/jeepney/jeepney_full_damage.png',
        '/jeepney_jump/assets/images/jeepney/jeepney_no_damage.png',
        '/jeepney_jump/assets/images/obstacles/motorcycle.png',
        '/jeepney_jump/assets/images/obstacles/street_dog.png',
        '/jeepney_jump/assets/audio/bonus.wav',
        '/jeepney_jump/assets/audio/dog_hit.mp3',
        '/jeepney_jump/assets/audio/jeepney_jump.mp3',
        '/jeepney_jump/assets/audio/jeepney.mp3',
        '/jeepney_jump/assets/audio/lupang_hinirang.mp3',
        '/jeepney_jump/assets/audio/motorcycle_hit.mp3'
      ]);
    })
  );
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        caches.open('v1').then((cache) => {
          cache.put(event.request, response.clone());
        });
        return response;
      });
    }).catch(() => {
      return caches.match('/jeepney_jump/images/start.png');
    })
  );
});

this.addEventListener('activate', (event) => {
  const cacheWhitelist = ['v1'];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
