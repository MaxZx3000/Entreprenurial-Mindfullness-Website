import MyFetch from "../../globals/my-fetch";
import FetchHelpers from "../../utils/fetch-helpers";
import Localization from "../../utils/localization";

class StatisticsPage extends HTMLElement{
    constructor(){
        super();
        this.statisticsElement = document.createElement("div");
    }

    _getData(){
        const data = {
            labels: [
                "Sample 1",
                "Sample 2",
                "Sample 3",
            ],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#FF6384',
                        '#63FF84',
                        '#84FF63'
                    ],
                    hoverOffset: 4
                }
            ]  
        }

        return data;
    }
    async fetchStatisticsData(){
        const statisticsJSON = await MyFetch.getStatistics()
        this.statistics = statisticsJSON
    }
    render(){
        const statisticsJSON = this.statistics.json
        this.statisticsElement.innerHTML = `
            <div class = "h1-header">
                <h1>Statistics</h1>
            </div>
            <div class = "container">
                <div class = "row">
                    <div class = "container" id = "em-stats">
                        <h2>Overall EM Stats</h2>
                        <p>Mean of EM Score: ${statisticsJSON.mean}</p>
                        <p>Median of EM Score: ${statisticsJSON.median}</p>
                        <p>Lower bound of EM Score: ${statisticsJSON.lower_bound}</p>
                        <p>Upper bound of EM Score: ${statisticsJSON.upper_bound}</p>
                        <!-- <p>P Value EM Score: ${statisticsJSON.p_value}</p>
                        <p>FF Score EM Score: ${statisticsJSON.ff_score}</p> -->
                    </div>
                    <hr>
                    <!-- <div class = "container" id = "statistical-test">
                        <h2>Statistical Tests Results: </h2>
                        <table>
                            <tr>
                                <th id = "table-upper-left">Field</th>
                                <th>Type of Test</th>
                                <th>Results</th>
                                <th id = "table-upper-right">Conclusion</th>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>t-test</td>
                                <td>t-value = 0.0001</td>
                                <td>Sample </td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>t-test</td>
                                <td>t-value = 0.1000</td>
                                <td>Sample </td>
                            </tr>
                        </table>
                    </div>
                    <div class = "demography container" id = "demography">
                        <h2>Demography Charts</h2>
                        <div class = "row">
                            <div class = "col-sm-6 col-md-6 col-lg-6">
                                <h3>Country</h3>
                                <canvas id = "countryChart" width = "100" height = "100"></canvas>
                            </div>
                            <div class = "col-sm-6 col-md-6 col-lg-6">
                                <h3>Gender</h3>
                                <canvas id = "genderChart" width = "200" height = "200"></canvas>
                            </div>
                            <div class = "col-sm-6 col-md-6 col-lg-6">
                                <h3>Status</h3>
                                <canvas id = "statusChart" width = "200" height = "200"></canvas>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        `;
        // this.addPieCountryElement();
        // this.addGenderElement();
        // this.addStatusElement();
    }

    // addPieCountryElement(){
    //     const countryChartElement = this.statisticsElement.querySelector("#countryChart");
    //     const countryContext = countryChartElement.getContext("2d")

    //     const countryChart = new Chart(countryContext, {
    //         type: 'doughnut',
    //         data: this._getData()
    //     });
    // }
    // addGenderElement(){
    //     const countryChartElement = this.statisticsElement.querySelector("#genderChart");
    //     const countryContext = countryChartElement.getContext("2d")

    //     const countryChart = new Chart(countryContext, {
    //         type: 'doughnut',
    //         data: this._getData()
    //     });
    // }
    // addStatusElement(){
    //     const countryChartElement = this.statisticsElement.querySelector("#statusChart");
    //     const countryContext = countryChartElement.getContext("2d")

    //     const countryChart = new Chart(countryContext, {
    //         type: 'doughnut',
    //         data: this._getData()
    //     });
    // }
    async init(){
        await this.fetchStatisticsData();
        this.render();
        this.appendChildren();
    }
    appendChildren(){
        this.appendChild(this.statisticsElement);
    }
}

customElements.define("statistics-page", StatisticsPage);
export default StatisticsPage;