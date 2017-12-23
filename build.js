const htmlFolder = './html/';
const fs = require('fs');

const excludedFiles = [];

let pages = [];

let files = fs.readdirSync(htmlFolder);
files.forEach(file => {
    if (file.indexOf('.html') >= 0 && file.indexOf('.swp') < 0 && excludedFiles.indexOf(file) < 0) {
        let page = { href: 'html/' + file };
        page.link = file.replace('.html', '').replace(/--/g, ' ').replace(/-/g, ' ').replace(/_/g, ' ');
        page.link = page.link.charAt(0).toUpperCase() + page.link.slice(1);
        pages.push(page);
    }
});

function getLinks() {
    let links = '';
    pages.forEach(page => {
        links = links + '<li><a href="' + page.href + '">' + page.link + '</a></li>';
    });
    return links;
}

function getSlides() {
    let slides = '';
    pages.forEach(page => {
        slides = slides + '"' + page.href + '", ';
    });
    return slides;
}

function replaceVars (html) {
    return html.replace(/\{\{(.+?)\}\}/g, (match) => { return eval(match.replace('{{', '').replace('}}', '')); });
}

let templates = fs.readdirSync('./');
templates.forEach(template => {
    if (template.indexOf('.tpl') >= 0 && template.indexOf('.swp') < 0) {
        let templateHtml = fs.readFileSync(template, { encoding: 'utf8', flag: 'r' });
        templateHtml = replaceVars(templateHtml);
        fs.writeFile(template.replace('.tpl', '.html'), templateHtml);
    }
});

console.log('Built!');
