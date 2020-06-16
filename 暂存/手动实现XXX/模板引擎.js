let template = '我是{{name}}';
let data = {
    name: 'hh'
};

function render(template, data) {
    const reg = /\{\{(\w+)\}\}/;
    if(reg.test(template)) {
        const name = reg.exec(template)[1];
        template = template.replace(reg, data[name]);
        return render(template, data);
    }
    return template;
}