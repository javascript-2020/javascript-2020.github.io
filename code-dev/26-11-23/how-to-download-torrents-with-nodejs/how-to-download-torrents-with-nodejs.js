


/*

how-to-download-torrents-with-nodejs.js

26-11-23


note:

nodejs script, remember to save with .mjs


*/


        import WebTorrent from 'webtorrent';
        
        var MAGNET_URL        = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel';
        
        var DOWNLOAD_PATH     = './downloads';
        
        var client            = new WebTorrent();
        client.on('error',err=>{
                                                                                console.error('[CLIENT ERROR]', err.message);
        });
        
                                                                                //  see also
                                                                                //  https://github.com/ngosang/trackerslist
        var TRACKERS    = [
        
              'wss://tracker.openwebtorrent.com',
              'wss://tracker.webtorrent.dev',
              'wss://tracker.fastcast.nz',
              'wss://tracker.btorrent.xyz',
              
              'udp://tracker.opentrackr.org:1337/announce',
              'udp://open.tracker.cl:1337/announce',
              'http://tracker.openwebtorrent.com:80/announce',
              
        ];
                                                                                console.log('1. Adding torrent...');
                                                                                
        var torrent   = client.add(MAGNET_URL,{path:DOWNLOAD_PATH,announce:TRACKERS},torrent=>{
                                                                                console.log('2. Metadata loaded  :',torrent.name);
                                                                                console.log('          InfoHash  :',torrent.infoHash);
                                                                                console.log('             Files  :',torrent.files.map(f=>f.name));
        });
        
        torrent.on('warning',err=>console.log('[WARN]',err.message));
        torrent.on('infoHash',()=>console.log('   InfoHash parsed:',torrent.infoHash));
        torrent.on('trackerAnnounce',()=>console.log('   Announced to tracker'));
        torrent.on('trackerPeer',addr=>console.log('   Tracker returned peer:',addr));
        torrent.on('dhtAnnounce',()=>console.log('   Announced to DHT'));
        
        torrent.on('wire',()=>{
                                                                                console.log('3. Peer connected | peers:',torrent.numPeers);
        });
        
        torrent.on('download',()=>{
                                                                                var pct=(torrent.progress*100).toFixed(1);
                                                                                var kbps=(torrent.downloadSpeed/1024).toFixed(1);
                                                                                var s=`\rProgress: ${pct}% | Speed: ${kbps} KB/s | Peers: ${torrent.numPeers}   `;
                                                                                process.stdout.write(s);
        });
        
        torrent.on('done',()=>{
                                                                                console.log('\n4. Done! Saved to',DOWNLOAD_PATH);
              client.destroy();
              
        });
        
        
        