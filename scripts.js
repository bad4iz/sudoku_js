/**
 * Created by bad4iz on 12.11.16.
 */

//метод проверки на существовония глобального имени
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
};
Array.method('fillIncr', function (length, start) {
    start = start || 0;
    for (var i = 0; i < length; i++) {
        this.push(i + start);
    }
    return this;
});
Element.method('addClass', function (className) {
    var classes = this.className.split(' '); // получаем строку всех классов и превращаем в масив с помощью оператора split
    if (classes.indexOf(className) < 0) { // проверка массива на наличие className
        classes.push(className);   // добавление класса в массив class
        // присваиваем объекту в качестве нового класснейь
        this.className = classes.join(' ').trim(); // join() - преврашение масива в строку trim() - удаление лишних пробелов
    }
});
Element.method('removeClass', function (className) {
    var classes = this.className.split(' '); // получаем строку всех классов и превращаем в масив с помощью оператора split
    var index = classes.indexOf(className); // получаем индекс в масиве элемента classes
    if (index >= 0) { // проверка массива на наличие className
        classes.splice(index, 1);   // удаление элемента из масива по индексу
        // присваиваем объекту в качестве нового класснейь
        this.className = classes.join(' ').trim(); // join() - преврашение масива в строку trim() - удаление лишних пробелов
    }
});

var app = {};

app.Sudoku = function (area) {
    var that = this;
    var table = document.createElement('table');
    table.addClass('sudoku');
    var area = area || 3;
    var expo = area * area;
    for (var i = 0; i < expo; i++) {
        var row = table.insertRow(-1); // вставка строки в таблицу -1 в конец таблицы  0 в начало
        for (var j = 0; j < expo; j++) {
            var cell = row.insertCell(-1);// вставка ячейки в таблицу -1 в конец таблицы  0 в начало таблицы
            cell.innerHTML = j;
            switch (i % area) {
                case 0:
                    cell.addClass('top');
                    break;
                case area - 1:
                    cell.addClass('bottom');
                    break;
            }
            switch (j % area) {
                case 0:
                    cell.addClass('left');
                    break;
                case area - 1:
                    cell.addClass('right');
                    break;
            }
        }
    }
    that.table = table; // запись в доступную из внешней среды перемную
    that.expo = expo;
};

app.Sudoku.prototype = {
    fill: function (values) {
        var that = this;
        that.values = values;
        for (var i = 0; i < that.expo; i++) {
            var row = that.table.rows[i];
            for (var j = 0; j < that.expo; j++) {
                var cell = that.table.rows[i].cells[j];
                cell.innerHTML = values[i][j];
            }
        }
    }
};

app.Generator = function (area) {
    var that = this;
    var area = area || 3;
    var expo = area * area;
    var base = [].fillIncr(expo, 1);
    var rows = [];
    for (var i = 0; i < expo; i++) {
        var row = [];
        var start = (i%area) * area + parseInt(i/area, 10);
        console.log(start + ' = ' + (i%area) + ' * ' + area + ' + ' + parseInt(i/area, 10));
        for (var j = 0; j < expo; j++) {
            row.push(base.slice(start, expo).concat(base)[j]);
        }
        rows.push(row);
    }
    that.rows = rows;
    that.expo = expo;
    that.area = area;

};

app.Generator.prototype = {
    invertVertical: function () {
        var that = this;
        that.rows.reverse(); // реверс
        return that;
    }
}

var tbl = new app.Sudoku();
document.body.appendChild(tbl.table); // прикрепляем таблицу

var generator = new app.Generator();
tbl.fill(generator.rows);







