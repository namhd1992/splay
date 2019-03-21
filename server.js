const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs')


  // <meta name="og-url" property="og:url" content="https://splay.vn" />
	// <meta name="og-type" property="og:type" content="Game" />
	// <meta name="og-title" property="og:title" content="Cổng game SPLAY - VTC Mobile" />
	// <meta name="og-description" property="og:description" content="Tổng hợp các game HOT nhất trên thị trường & đa nền tảng." />
	// <meta name="og-image" property="og:image" content="https://splay.vn/logo_demo.png" />;

app.get('/', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});

app.get('/about-us', function(request, response) {
   const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});

app.get('/login', function(request, response) {
  
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
    response.send(result);
  });
});
app.get('/history', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/game', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/gamedetail/:id', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/auction', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/auctiondetail/:id', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/itemgiftcodedetail/:id', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/giftcode', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/giftcodedetail/:id', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/lucky', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/help', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/dieu-khoan', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/vip', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/mission', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });

  app.get('/inbox', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/profile', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/article', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/article_detail/:id', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/checkin', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/luckydetail/:id', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/giftcodeplugin', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/giftcodepluginlogin', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
    data = data.replace(/\$OG_TYPE/g, "Game");
    data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
    data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
    result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/phonecard', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/chongame', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/chitiet', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/doi', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn');
      data = data.replace(/\$OG_TYPE/g, "Game");
      data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
      result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
      response.send(result);
    });
  });
  app.get('/MCD-trieuhoi', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn/MCD-trieuhoi');
      data = data.replace(/\$OG_TYPE/g, "website");
      data = data.replace(/\$OG_TITLE/g, 'Triệu hồi lệnh - Mộng Chinh Đồ');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tham gia sự kiện Mời bạn cùng chơi > nhận Xu > chuyển thành KNB nhanh chóng. Game H5 chiến quốc mới nhất từ VTC Mobile năm 2019");
      result = data.replace(/\$OG_IMAGE/g, 'https://i.postimg.cc/HxZ16Qpw/skshare-mcd.png');
      response.send(result);
    });
  });
  app.get('/MCD-trieuhoi/:id', function(request, response) {
    
    const filePath = path.resolve(__dirname, './build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_URL/g, 'https://splay.vn/MCD-trieuhoi/');
      data = data.replace(/\$OG_TYPE/g, "website");
      data = data.replace(/\$OG_TITLE/g, 'Triệu hồi lệnh - Mộng Chinh Đồ');
      data = data.replace(/\$OG_DESCRIPTION/g, "Tham gia sự kiện Mời bạn cùng chơi > nhận Xu > chuyển thành KNB nhanh chóng. Game H5 chiến quốc mới nhất từ VTC Mobile năm 2019");
      result = data.replace(/\$OG_IMAGE/g, 'https://i.postimg.cc/HxZ16Qpw/skshare-mcd.png');
      response.send(result);
    });
  });
  // app.get('/test-game', function(request, response) {
    
  //   const filePath = path.resolve(__dirname, './build', 'index.html')
  //   fs.readFile(filePath, 'utf8', function (err,data) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     data = data.replace(/\$OG_URL/g, 'https://splay.vn');
  //     data = data.replace(/\$OG_TYPE/g, "Game");
  //     data = data.replace(/\$OG_TITLE/g, 'Cổng game SPLAY - VTC Mobile');
  //     data = data.replace(/\$OG_DESCRIPTION/g, "Tổng hợp các game HOT nhất trên thị trường & đa nền tảng.");
  //     result = data.replace(/\$OG_IMAGE/g, 'https://splay.vn/logo_demo.png');
  //     response.send(result);
  //   });
  // });
app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));