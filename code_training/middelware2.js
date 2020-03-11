
const Middleware = function () { };
const middleware = new Middleware();

Middleware.prototype.use = function (fn) {
    var self = this;
    this.go = (function (stack) {
        return function (next) {
            stack.call(self, function () {
                fn.call(self, next.bind(self));
            });
        }.bind(this);
    })(this.go);
};

Middleware.prototype.go = function (next) {
    console.log(next)
    next();
};
middleware.use(function (next) {
    var self = this;
    setTimeout(function () {
        self.hook1 = true;
        next();
    }, 10);
});

// middleware.use(function (next) {
//     var self = this;
//     setTimeout(function () {
//         self.hook2 = true;
//         next();
//     }, 10);
// });

// middleware.use(function (next) {
//     var self = this;
//     setTimeout(function () {
//         self.hook3 = false;
//         next();
//     }, 10);
// });

var start = new Date();
middleware.go(function () {
    console.log(this.hook1); // true
    console.log(this.hook3); // true
    console.log(this.hook2); // true
    console.log(new Date() - start); // around 20
});

