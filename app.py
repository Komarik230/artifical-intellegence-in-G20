from flask import Flask, render_template, abort

app = Flask(__name__)

COUNTRY_PAGES = {
    "argentina": "argentina.html",
    "australia": "australia.html",
    "brazil": "brazil.html",
    "canada": "canada.html",
    "china": "china.html",
    "france": "france.html",
    "germany": "germany.html",
    "india": "india.html",
    "indonesia": "indonesia.html",
    "italy": "italy.html",
    "japan": "japan.html",
    "mexico": "mexico.html",
    "russia": "russia.html",
    "saudi-arabia": "saudi-arabia.html",
    "south-africa": "south-africa.html",
    "south-korea": "south-korea.html",
    "turkey": "turkey.html",
    "united-kingdom": "united-kingdom.html",
    "usa": "usa.html",
}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/country/<slug>")
def country(slug):
    page = COUNTRY_PAGES.get(slug)

    if page is None:
        abort(404)

    return render_template(f"countries/{page}")


if __name__ == "__main__":
    app.run(debug=True)