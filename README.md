# template2Image

## Description
Html template'i resim'e dönüştürmek için kullanılır

## Example
```javascript
import template2Image from "template2image";

const createCardImage = async () => {
    const image = await template2Image(`
    <html>
        <head>
            <style>
                #card {
                    color: white;
                    border-radius: 8px;
                    background-color: black;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            </style
        </head>
        <body>
            <div id="card">
                {{title}}
            <div>
        </body>
    </html>
`, { title: "Hello template2Image :D" }, "card");
    console.log(image);
    // Image return for base64
}

createCardImage();
```

![template2image](https://images.371digital.com/tempalte2image.png)