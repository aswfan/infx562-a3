(function() {
    var margin = {top: 20, right: 20, bottom: 100, left: 50},
    margin2 = {top: 420, right: 20, bottom: 20, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

    var parseDate = d3.timeParse("%m/%d/%Y");
    var daterange = $('input[name="daterange"]');

   $('#filter').on("click", () => {
        $('#pleaseWaitDialog').modal('show');
    });

    $('#pleaseWaitDialog').on('show.bs.modal', (e) => {
        if($('#company').val() !== "") {
            filterDataAndDraw();
        }
    });

    var x = techan.scale.financetime()
            .range([0, width]);

    var x2 = techan.scale.financetime()
            .range([0, width]);

    var y = d3.scaleLinear()
            .range([height, 0]);

    var yVolume = d3.scaleLinear()
            .range([y(0), y(0.3)]);

    var y2 = d3.scaleLinear()
            .range([height2, 0]);

    var brush = d3.brushX()
            .extent([[0, 0], [width, height2]])
            .on("end", brushed);

    var candlestick = techan.plot.candlestick()
            .xScale(x)
            .yScale(y);

    var volume = techan.plot.volume()
            .xScale(x)
            .yScale(yVolume);

    var close = techan.plot.close()
            .xScale(x2)
            .yScale(y2);

    var xAxis = d3.axisBottom(x);

    var xAxis2 = d3.axisBottom(x2);

    var yAxis = d3.axisLeft(y);

    var yAxis2 = d3.axisLeft(y2)
            .ticks(0);

    var ohlcAnnotation = techan.plot.axisannotation()
            .axis(yAxis)
            .orient('left')
            .format(d3.format(',.2f'));

    var timeAnnotation = techan.plot.axisannotation()
            .axis(xAxis)
            .orient('bottom')
            .format(d3.timeFormat('%Y-%m-%d'))
            .width(65)
            .translate([0, height]);

    var crosshair = techan.plot.crosshair()
            .xScale(x)
            .yScale(y)
            .xAnnotation(timeAnnotation)
            .yAnnotation(ohlcAnnotation)
            .on("move", move)
            .on("out", out);

    var svg = d3.select("svg")
            .attr("height", height + margin.top + margin.bottom);

    var focus = svg.append("g")
            .attr("class", "focus")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    focus.append("clipPath")
            .attr("id", "clip")
        .append("rect")
            .attr("x", 0)
            .attr("y", y(1))
            .attr("width", width)
            .attr("height", y(0) - y(1));

    focus.append("g")
            .attr("class", "volume")
            .attr("clip-path", "url(#clip)");

    focus.append("g")
            .attr("class", "candlestick")
            .attr("clip-path", "url(#clip)");

    focus.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")");

    focus.append("g")
            .attr("class", "y axis")
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Price ($)");

    focus.append('g')
            .attr("class", "crosshair")
            .call(crosshair);

    var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    context.append("g")
            .attr("class", "close");

    context.append("g")
            .attr("class", "pane");

    context.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height2 + ")");

    context.append("g")
            .attr("class", "y axis")
            .call(yAxis2);

    function filterDataAndDraw() {
        d3.csv("prices.csv", (error, data) => {
                var accessor = candlestick.accessor(), flag = false, from, to,
                timestart = Date.now();
                var drvalue = daterange.val();
                var company = $('#company').val();
                if(drvalue !== "") {
                        var dates = drvalue.split(" - ");
                        from = parseDate(dates[0]).getTime();
                        to = parseDate(dates[1]).getTime()
                        flag = true;
                }
                data = data.filter((d)=> {
                        var ok = d.symbol == company;
                        if(flag) {
                        var date = parseDate(d.date).getTime();
                        ok = ok && date > from && date < to;
                        }
                        return ok;
                }).map(function(d) {
                        return {
                        name: d.symbol,
                        date: parseDate(d.date),
                        open: +d.open,
                        high: +d.high,
                        low: +d.low,
                        close: +d.close,
                        volume: +d.volume
                        };
                }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });

                x.domain(data.map(accessor.d));
                x2.domain(x.domain());
                y.domain(techan.scale.plot.ohlc(data, accessor).domain());
                y2.domain(y.domain());
                yVolume.domain(techan.scale.plot.volume(data).domain());

                focus.select("g.candlestick").datum(data);
                focus.select("g.volume").datum(data);

                context.select("g.close").datum(data).call(close);
                context.select("g.x.axis").call(xAxis2);

                // Associate the brush with the scale and render the brush only AFTER a domain has been applied
                context.select("g.pane").call(brush).selectAll("rect").attr("height", height2);

                x.zoomable().domain(x2.zoomable().domain());
                draw();

                console.log("Render time: " + (Date.now()-timestart));
                $('#pleaseWaitDialog').modal('toggle');
        });
    }


    function brushed() {
        var zoomable = x.zoomable(),
            zoomable2 = x2.zoomable();

        zoomable.domain(zoomable2.domain());
        if(d3.event.selection !== null) zoomable.domain(d3.event.selection.map(zoomable.invert));
        draw();
    }

    function draw() {
        var candlestickSelection = focus.select("g.candlestick"),
            data = candlestickSelection.datum();
        y.domain(techan.scale.plot.ohlc(data.slice.apply(data, x.zoomable().domain()), candlestick.accessor()).domain());
        candlestickSelection.call(candlestick);
        focus.select("g.volume").call(volume);
        // using refresh method is more efficient as it does not perform any data joins
        // Use this if underlying data is not changing
//        svg.select("g.candlestick").call(candlestick.refresh);
        focus.select("g.x.axis").call(xAxis);
        focus.select("g.y.axis").call(yAxis);
    }

    function move(coords) {
        var company = $('#company').val();
        var record = focus.select("g.candlestick").datum().filter((d) => {
                return d.name === company && d.date === coords.x;
        })
        $('#date').text(timeAnnotation.format()(record[0].date));
        $('#open').text(record[0].open);
        $('#close').text(record[0].close);
        $('#high').text(record[0].high);
        $('#low').text(record[0].low);
        $('#volume').text(record[0].volume);
    }

    function out() {
        $('#date').text('');
        $('#open').text('');
        $('#close').text('');
        $('#high').text('');
        $('#low').text('');
        $('#volume').text('');
    }

    
})();