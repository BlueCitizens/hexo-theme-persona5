// Settings

const svgWidth = 100; // must match viewBox in HTML
const svgHeight = 50;
const animationSpeed = 120; // speed in ms

// 0 = go to edge
// higher = points stay further from edge
// max: width/2 or height/2
const horizontalEdgePadding = 0;
const verticalEdgePadding = 0;

// higher = points stay further from center
// 0 = points may touch
// max: width/2 or height/2
const horizontalCenterPadding = 20;
const verticalCenterPadding = 5;

// const menuPositions = [
//     { left: '50%', top: '26.5%', width: '15%', height: '8%' },
//     { left: '51%', top: '32.4%', width: '15%', height: '8%' },
//     { left: '46%', top: '38%', width: '24%', height: '8%' },
//     { left: '43%', top: '43.3%', width: '20%', height: '8%' },
//     { left: '45.5%', top: '50%', width: '20%', height: '8%' },
//     { left: '39%', top: '55.2%', width: '32%', height: '7%' },
//     { left: '40%', top: '61%', width: '20%', height: '8%' },
//     { left: '42.5%', top: '66.6%', width: '20%', height: '8%' },
//     { left: '41.25%', top: '72%', width: '20%', height: '8%' },
// ];

// Animation

let currentMenuItem = 0;

const centerX = svgWidth / 2;
const centerY = svgHeight / 2;
const w = centerX - horizontalCenterPadding - horizontalEdgePadding;
const h = centerY - verticalCenterPadding - verticalEdgePadding;

const selector = Snap('.selector');
console.log(selector)
const red = selector.select('.red');
const blue = selector.select('.blue');
// let menuRect = document.querySelector('.menu').getBoundingClientRect();
// note: this is very unperformant.
// but I am lazy. and this is for fun.
window.addEventListener('resize', () => {
    clrCursor();
});

const animate = () => {
    [red, blue].forEach((layer) => {
        layer.animate({
            points: [
                // x1, y1
                Math.random() * w + horizontalEdgePadding,
                Math.random() * h + verticalEdgePadding,
                // x2, y2
                Math.random() * w + centerX + horizontalCenterPadding,
                Math.random() * h + verticalEdgePadding,
                // x3, y3
                Math.random() * w + centerX + horizontalCenterPadding,
                Math.random() * h + centerY + verticalCenterPadding,
                // x4, y4
                Math.random() * w + horizontalEdgePadding,
                Math.random() * h + centerY + verticalCenterPadding,
            ],
        }, animationSpeed);
    });
};

const menuList = [
    { name: "menu-github", title: "GitHub", link: "https://github.com/BlueCitizens/hexo-theme-persona5", target: "_blank" },
    { name: "menu-blog", title: "BLOG", link: "https://blog.bckun.top", target: "_blank" },
    // { name: "menu-steam", title: "STEAM", link: "", target: "_blank" },
    { name: "menu-bilibili", title: "BILIBILI", link: "https://space.bilibili.com/3718581", target: "_blank" },
    { name: "menu-contact", title: "CONTACT", link: "javascript:void(0)", target: "" },
    { name: "menu-about", title: "ABOUT", link: "javascript:void(0)", target: "" }
];
for (var i in menuList) {
    var menu = document.getElementById("menu-title");
    var para = document.createElement("p");
    var a = document.createElement("a");
    a.setAttribute("class", menuList[i]["name"])
    a.href = menuList[i]["link"]
    a.target = menuList[i]["target"]
    var node = document.createTextNode(menuList[i]["title"]);
    para.appendChild(a);
    para.addEventListener("mouseover", hover);
    para.addEventListener("mouseout", clrCursor);
    a.appendChild(node);
    menu.appendChild(para);
}

document.querySelector(".menu-about").addEventListener("click", showAbout)

document.querySelector(".menu-contact").addEventListener("click", showContact)

document.querySelector('.contact').addEventListener('click', event => {
    document.querySelector('.contact').style.display = "none";  // chromium内核
});

// document.querySelector('.contact img').addEventListener('click', event => {
//     event.stopPropagation();  // chromium内核
// });

document.getElementById("about-close").addEventListener("click", closeAbout)

// const keydownHandler = (e) => {
//     function moveDown() {
//         currentMenuItem++;
//         if (currentMenuItem > menuPositions.length - 1) {
//             currentMenuItem = menuPositions.length - 1;
//         }
//         moveCursor();
//     }

//     function moveUp() {
//         currentMenuItem--;
//         if (currentMenuItem < 0) {
//             currentMenuItem = 0;
//         }
//         moveCursor();
//     }

//     switch (e.keyCode) {
//         case 38:
//             moveUp();
//             e.preventDefault();
//             break;
//         case 40:
//             moveDown();
//             e.preventDefault();
//             break;
//     }
// };

// const moveCursor = () => {
//     const cursor = document.querySelector('.selector');
//     cursor.style.left = menuPositions[currentMenuItem].left;
//     cursor.style.top = menuPositions[currentMenuItem].top;
//     cursor.style.width = menuPositions[currentMenuItem].width;
//     cursor.style.height = menuPositions[currentMenuItem].height;
// };

function selectCursor(left, top, width, height) {
    const cursor = document.querySelector('.selector');
    cursor.style.left = left;
    cursor.style.top = top;
    cursor.style.width = width;
    cursor.style.height = height;
};

// const mousemoveHandler = (evt) => {
//     const y = evt.clientY + window.scrollY;
//     const pos = 100 * y / menuRect.height;
//     for (let i = menuPositions.length - 1; i >= 0; i--) {
//         const top = parseFloat(menuPositions[i].top);
//         // console.log({ pos, top });
//         if (pos >= top) {
//             currentMenuItem = i;
//             moveCursor();
//             break;
//         }
//     }
// };
function hover(e) {
    var tar = e.target
    // console.log(getElementTop(tar))
    var centerY = getElementTop(tar) + tar.offsetHeight / 2 + 'px'
    var centerX = getElementLeft(tar) + tar.offsetWidth / 2 + 'px'
    // var width = tar.offsetWidth + 'px'
    selectCursor(centerX, centerY, "25%", "10%")

    document.querySelector('.selector').style.display = "inline";
    return centerY
}

function clrCursor() {
    document.querySelector('.selector').style.display = "none";
}

function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }

    return actualLeft;
}

function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    return actualTop;
}

function showAbout() {

    const about = document.querySelector('.about');
    about.style.display = "inline";
}

function showContact() {

    const contact = document.querySelector('.contact');
    contact.style.display = "block";
}

function closeContact() {
    
}
function closeAbout() {

    const about = document.querySelector('.about');
    about.style.display = "none";
}
// Show me your true form!

// document.addEventListener('keydown', keydownHandler);
// document.querySelector('.menu').addEventListener('mousemove', mousemoveHandler);
setInterval(animate, animationSpeed);