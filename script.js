

Vue.component ('navigation', {
    template: `<div id='app'>
        <b-navbar id="navi" toggleable="sm" type="light" variant="warning" sticky>
            <b-container fluid="md" class="my-2">
                <b-navbar-brand tag="h1" class = "ml-3" href="index.html">Sejin Kim</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                
                <b-collapse id="nav-collapse" is-nav> 
                    <b-navbar-nav class="mx-auto" align="center">
                        <b-nav-item href="https://github.com/skim2257/" target="_blank" title="GitHub">
                            <i class="fab fa-github"></i>
                        </b-nav-item>
                        <b-nav-item href="https://www.linkedin.com/in/sejin-k-232111115/" target="_blank" title="LinkedIn">
                            <i class="fab fa-linkedin"></i>
                        </b-nav-item>
                        <b-nav-item href="https://scholar.google.ca/citations?user=OvOVQzUAAAAJ&hl=en&authuser=1" target="_blank" title="Google Scholar">
                            <i class="fas fa-graduation-cap"></i>
                        </b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml">
                        <b-navbar-nav>
                            <b-nav-item href="experience.html">About</b-nav-item>
                        </b-navbar-nav>
                        <b-nav-item-dropdown text="Projects" right>
                            <b-dropdown-item href="#">AI Royale</b-dropdown-item>
                            <b-dropdown-item href="#">Mashup Generator</b-dropdown-item>
                            <b-dropdown-item href="holdings.html">Current Holdings</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-navbar-nav>
                            <b-nav-item href="assets/Sejin Kim - Resume_2020.pdf" target="_blank">Resume</b-nav-item>
                        </b-navbar-nav>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>`
})

Vue.config.devtools=true

const now = new Date();

function addzero (n) {
    if (n < 10) return '0' + n
    else return n
}

function tickerRead (evt) {
    var tickers = new Array()
    fetch (evt)
        .then (response => response.json())
        .then (data => {
            for (const ticker of data.symbols) {
                tickers.push (ticker.symbol);
            }
        })
    return tickers
}

function holdingsRead (evt) {
    var holdings = new Array()
    fetch (evt)
        .then (response => response.json())
        .then (data => {
            for (const trade of data.trades) {
                holdings.push (trade);
            }
        })
    return holdings
}

new Vue ({
    el: '#app',
    data: {
        holdings: holdingsRead('assets/trades.json'),
        form: {
            stock: '',
            num: 0,
            price: null,
            date: now,
            time: addzero (now.getHours()) + ":" + addzero (now.getMinutes()),
            total: null,
            exchange: 1.0
        },
        tickers: tickerRead('assets/symbols.json'),
    },
    methods: {
        upperForm (value) {
            return value.toUpperCase()
        },
        test (hi) {
            alert ("hi")
        },
        updateExchange() {
            exRate = this.form.total/this.form.price/this.form.num
            if (exRate > 0 && exRate < 10000) this.form.exchange = exRate.toFixed(4)
        },
        onSubmit (evt) {
            evt.preventDefault ()
            console.log (JSON.stringify(this.form))
            this.stonks.push (this.form)
            console.log (JSON.stringify(this.stonks))
            console.log (this.stonks)
        }
    }
});