const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');

const app = express();
const port = 3000;

app.set('view engine', 'mustache');

app.engine('mustache',mustacheExpress({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'mustache',
    defaultLayout: 'index',
}));
app.use(express.static('public'));

const renderName = (text) => {
    return "John" + text;
}
const lambdaFunction = {
    "name": "David",
    "wrapped": function() {
      return function(text, render) {
        return "<b>" + render(text) + "</b>"
      }
    },
    "sample": function() {
        return function(text,render) {
            return render(renderName(text));
        };  
    }
  };

const datae = [
    {
        show: true,
        name: 'X',
        jobType: 'IT'
    },
    {
        show: false,
        name: 'y',
        jobType: 'Non - IT'
    },
    {
        show: true,
        name: 'Z',
        jobType: '<i>Government</i>'
    }
];

app.get('/', (req,res) => {
    res.render('main', { users: datae, myLambda: lambdaFunction });
});

app.listen(port, () => {
    console.log(`Successfully running in the port ${port}`);
});