import React, { useState } from "react";
import './pricingPage.css';


const PricingPage = () => {
    const [services, setServices] = useState({
        aeration: false,
        sprinklerBlowout: false,
        fertilizer: false,
        overseeding: false,
        additionalZones: 0,
        cornerLot: false,
        walkout: false,
    });
    const [totalCost, setTotalCost] = useState(0);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setServices(prevServices => ({
            ...prevServices,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const calculateTotalCost = () => {
        let cost = 0;
        let serviceCount = 0;

        if (services.aeration) {
            cost += 45;
            if (services.cornerLot) cost += 10;
            if (services.walkout) cost += 10;
            serviceCount++;
        }
        if (services.sprinklerBlowout) {
            cost += 45 + Math.max(0, (services.additionalZones - 4) * 3);
            serviceCount++;
        }
        if (services.fertilizer) {
            cost += 45;
            serviceCount++;
        }
        if (services.overseeding) {
            cost += 65;
            serviceCount++;
        }
        if (serviceCount > 1) {
            cost -= 5 * (serviceCount - 1);
        }

        setTotalCost(cost);
    };

    return (
        <div>
            <h1>Prices</h1>
            <h2>Prices for each Service</h2>
            <ul>
                <li>Aeration: $45 (standard lawn, $10 more for corner lots and $10 more for walkouts)</li>
                <li>Sprinkler Blow-out: $45 (includes first 4 zones, $3 each additional zone)</li>
                <li>Fertilizer: $45 (standard-size yard)</li>
                <li>Overseeding: $65 (standard size, ask for quote by size of yard)</li>
            </ul>
            <h2>Total Cost of Services quote</h2>
            <form>
                <div>
                    <label>
                        <input type="checkbox" name="aeration" onChange={handleChange} />
                        Aeration
                    </label>
                    {services.aeration && (
                        <>
                            <label>
                                <input type="checkbox" name="cornerLot" onChange={handleChange} />
                                Corner Lot
                            </label>
                            <label>
                                <input type="checkbox" name="walkout" onChange={handleChange} />
                                Walkout Basement
                            </label>
                        </>
                    )}
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="sprinklerBlowout" onChange={handleChange} />
                        Sprinkler Blow-out (includes first 4 zones, $3 each additional zone) Total # of Zones:
                    </label>
                    {services.sprinklerBlowout && (
                        <input type="number" name="additionalZones" value={services.additionalZones} onChange={handleChange} min="0" />
                    )}
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="fertilizer" onChange={handleChange} />
                        Fertilizer
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="overseeding" onChange={handleChange} />
                        Overseeding
                    </label>
                </div>
                <button type="button" onClick={calculateTotalCost}>Calculate Total Cost</button>
            </form>

            <h3>Total Cost: ${totalCost}</h3>
        </div>
    );
};

export default PricingPage;
