import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import sankeydiagram from '../coffee.png';

export const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Introduction />
      <Sankey />
      <Comparison />
      <StarbucksChart />
      <LayoutComponent />
    </div>
  );
};


function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-light fixed-top bg-transparent'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          <b>SIPSMART</b>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Ha Yeon
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Claire
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Anusha
              </a>
            </li>
            {/* <li className='nav-item'>
              <a className='nav-link' href='#'>
                Contact
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Introduction() {
  return (
    <section className='introduction d-flex align-items-center '>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6 title'>
            <p className='title-welcome'>WELCOME TO</p>
            <p className='title-sip'>SIP-SMART!</p>
            <p className='title-desc'>Explore the nutritional impact of Starbucks beverages, 
              from calories to caffeine, and understand their effects on your health. 
              This website visualizes vital insights, Scroll down and unlock the knowledge to enjoy your drinks with confidence!</p>
          </div>
        </div>
        <div className='row position-absolute w-100 bottom-0'>
          <div className='col text-center text-bounce'>
            <p className='scroll-text'>scroll for more</p>
            <p className='scroll-text-v'>v</p>
            <p className='scroll-text-v'>v</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sankey() {
  return (
    <section className='introduction1 d-flex align-items-center '>
      <div className='container-fluid'>
        <div className='row'>
        <div className='offset-md-2 col-md-4'>
            <div className='card shadow'>
              <div className='card-body'>
                <img src={sankeydiagram} alt="Sankey Diagram"></img>
              </div>
            </div>
          </div>
          <div className='offset-md-0 col-md-4 content'>
            {/* <div className='card shadow leftcard'>
              <div className='card-body'>
            <h1 className='card-title'></h1>
              </div>
            </div> */}
            <p className='card-text leftcard'> We Have Some Options that are<br></br> healthy comparitively
              the right side sankey diagram shows beverages that are less in calories
            </p>
            <img className='content-img-left' src="../public/arrow.png" alt="Sankey diagram"></img>
          </div>
        </div>
        <div className='row'>
        <div className='offset-md-2 col-md-4 content'>
            {/* <div className='card shadow rightcard'>
              <div className='card-body'>
            <h1 className='card-title'></h1>
              </div>
            </div> */}
            <p className='card-text rightcard'> We have Some
            Options that are unhealthy comparitively
            the left side sankey diagram shows beverages that are more in calories
            </p>
            <img className='content-img-right' src="../public/arrow.png" alt="Sankey diagram"></img>
        </div>
        <div className='offset-md-0 col-md-4'>
            <div className='card shadow'>
              <div className='card-body'>
                <img src={sankeydiagram} alt="Sankey diagram"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const [data, setData] = useState([]);
  const [beverageMap, SetFullMap] = useState(new Map());

  const [uniqueBeverageCat, setBeverageCat] = useState(new Set([]));
  const [uniqueBeverage, setUniqueBeverages] = useState(new Set([]));
  const [uniqueBeverageSize, setUniqueBeverageSize] = useState(new Set([]));
  const [uniqueMilkType, setUniqueMilkType] = useState(new Set([]));

  const [selectedBeverageCat, setSelectedBeverageCat] = useState('');
  const [selectedBeverage, setSelectedBeverage] = useState('');
  const [selectedBeverageSize, setSelectedBeverageSize] = useState('');
  const [selectedMilkType, setSelectedMilkType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('../starbucks_drinkMenu_expanded-revised.csv');
        const text = await response.text();
        const parsedData = d3.csvParse(text, d3.autoType);
        setData(parsedData);

        parsedData.forEach(entry => {
          const category = entry.Beverage_category;
          const beverage = entry.Beverage;
          const size = entry.Beverage_size;
          const milkType = entry.Milk_type;
          const nutritionalInfo = {
            Calories: +entry.Calories,
            'Total Fat (g)': +entry['Total Fat (g)'],
            'Trans Fat (g)': +entry['Trans Fat (g)'],
            'Saturated Fat (g)': +entry['Saturated Fat (g)'],
            'Sodium (mg)': +entry['Sodium (mg)'],
            'Total Carbohydrates (g)': +entry['Total Carbohydrates (g)'],
            'Cholesterol (mg)': +entry['Cholesterol (mg)'],
            'Dietary Fibre (g)': +entry['Dietary Fibre (g)'],
            'Sugars (g)': +entry['Sugars (g)'],
            'Protein (g)': +entry['Protein (g)'],
            'Vitamin A (% DV)': entry['Vitamin A (% DV)'],
            'Vitamin C (% DV)': entry['Vitamin C (% DV)'],
            'Calcium (% DV)': entry['Calcium (% DV)'],
            'Iron (% DV)': entry['Iron (% DV)'],
            'Caffeine (mg)': +entry['Caffeine (mg)'],
          };
          
          if (!beverageMap.has(category)) {
            beverageMap.set(category, new Map());
          }
          
          if (!beverageMap.get(category).has(beverage)) {
            beverageMap.get(category).set(beverage, new Map());
          }
          
          if (!beverageMap.get(category).get(beverage).has(size)) {
            beverageMap.get(category).get(beverage).set(size, new Map());
          }
        
          beverageMap.get(category).get(beverage).get(size).set(milkType, nutritionalInfo);

          uniqueBeverageCat.add(category);
          uniqueBeverage.add(beverage);
          uniqueBeverageSize.add(size);
          uniqueMilkType.add(milkType);
        });
        setSelectedBeverageCat(Array.from(uniqueBeverageCat)[0]);
        setSelectedBeverage(Array.from(uniqueBeverage)[0]);
        setSelectedBeverageSize(Array.from(uniqueBeverageSize)[0]);
        setSelectedMilkType(Array.from(uniqueMilkType)[0]);
    };

    fetchData();
    }, []);

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    setSelectedBeverageCat(event.target.value);
    let tempCat = event.target.value;
    let tempbev = beverageMap.get(tempCat).keys().next().value;
    let tempsize = beverageMap.get(tempCat).get(tempbev).keys().next().value;
    let tempmilk = beverageMap.get(tempCat).get(tempbev).get(tempsize).keys().next().value;
    setSelectedBeverage(tempbev);
    setSelectedBeverageSize(tempsize);
    setSelectedMilkType(tempmilk);
  };

  // Function to handle beverage selection
  const handleBeverageChange = (event) => {
    setSelectedBeverage(event.target.value);
    let tempbev = event.target.value;
    let tempsize = beverageMap.get(selectedBeverageCat).get(tempbev).keys().next().value;
    let tempmilk = beverageMap.get(selectedBeverageCat).get(tempbev).get(tempsize).keys().next().value;
    setSelectedBeverageSize(tempsize);
    setSelectedMilkType(tempmilk);
  };

  const handleBeverageSizeChange = (event) => {
    setSelectedBeverageSize(event.target.value);
    let tempsize = beverageMap.get(selectedBeverageCat).get(selectedBeverage).keys().next().value;
    let tempmilk = beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(tempsize).keys().next().value;
    setSelectedMilkType(tempmilk);
  };

  const handleMilkTypeChange = (event) => {
    setSelectedMilkType(event.target.value);
  };


  return (
    <section className='introduction d-flex align-items-center '>
      <div className='container-fluid'>
        <div className='row'>
          <div className='offset-md-2 col-md-8'>
            <div className='card shadow'>
              <div className='card-body'>
                <h1 className='card-title'>Introduction</h1>
                <div className='row'>
                  <div className='col-md-3'>
                    <div className="form-group">
                      <label htmlFor="categoryDropdown">Select Beverage Category:</label>
                      <select id="categoryDropdown" className="form-control" value={selectedBeverageCat} onChange={handleCategoryChange}>
                        {Array.from(uniqueBeverageCat).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className="form-group">
                      <label htmlFor="beverageDropdown">Select Beverage:</label>
                      <select id="beverageDropdown" className="form-control" value={selectedBeverage} onChange={handleBeverageChange}>
                        {/* <option value="All">Select</option> */}
                        {selectedBeverageCat !== '' && Array.from(beverageMap.get(selectedBeverageCat).keys()).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className="form-group">
                      <label htmlFor="beverageSizeDropdown">Select Beverage Size:</label>
                      <select id="beverageSizeDropdown" className="form-control" value={selectedBeverageSize} onChange={handleBeverageSizeChange}>
                        {/* <option value="All">Select</option> */}
                        {selectedBeverageCat !== '' && selectedBeverage !== '' && Array.from(beverageMap.get(selectedBeverageCat).get(selectedBeverage).keys()).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className="form-group">
                      <label htmlFor="milkTypeDropdown">Select Milk Type:</label>
                      <select id="milkTypeDropdown" className="form-control" value={selectedMilkType} onChange={handleMilkTypeChange}>
                      {/* <option value="All">Select</option> */}
                      {selectedBeverageCat !== '' && selectedBeverage !== '' && selectedBeverageSize !== '' && Array.from(beverageMap.get(selectedBeverageCat).get(selectedBeverage).get(selectedBeverageSize).keys()).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarbucksChart() {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState(new Map());
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const svgRef = useRef(null);

  // Load data and setup
  useEffect(() => {
      const fetchData = async () => {
          const response = await fetch('../starbucks_drinkMenu_expanded.csv');
          const text = await response.text();
          const parsedData = d3.csvParse(text, d3.autoType);
          // console.log("data loaded", parsedData);
          setData(parsedData);
          const grouped = d3.group(parsedData, d => d.Beverage_category);
          setGroupedData(grouped);
          const categories = Array.from(new Set(parsedData.map(d => d.Beverage_category)));
          setUniqueCategories(categories);
          setSelectedCategory(categories[0]); // Default to first category
      };

      fetchData();
  }, []);

  // Update visualization when category changes
  useEffect(() => {
      if (!selectedCategory || !groupedData.size) return;

      const filteredData = Array.from(groupedData.get(selectedCategory)).sort((a, b) => b.Calories - a.Calories);

      drawChart(filteredData);
  }, [selectedCategory, groupedData]);

  // Function to handle drawing the chart
  const drawChart = (filteredData) => {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear SVG before redrawing

      const margin = { top: 20, right: 30, bottom: 110, left: 200 };
      const height = 500 - margin.top - margin.bottom;
      const barWidth = 20;  // Set a fixed bar width
      const totalWidth = Math.max(800, filteredData.length * (barWidth + 10)) + margin.left + margin.right;

      svg.attr('viewBox', `0 0 ${totalWidth} ${height + margin.top + margin.bottom}`);

      const x = d3.scaleLinear()
          .domain([0, filteredData.length])
          .range([margin.left, filteredData.length * (barWidth + 10) + margin.left]);

      const y = d3.scaleLinear()
          .domain([0, d3.max(filteredData, d => d.Calories)])
          .range([height - margin.bottom, margin.top]);

      svg.append("g")
          .attr("fill", 'brown')
          .selectAll("rect")
          .data(filteredData)
          .join("rect")
              .attr("x", (d, i) => x(i))
              .attr("y", d => y(d.Calories))
              .attr("height", d => y(0) - y(d.Calories))
              .attr("width", barWidth);

      svg.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x)
              .tickFormat((d, i) => filteredData[i] ? filteredData[i].Beverage + " (" + filteredData[i].Beverage_prep + ")" : "")
              .ticks(filteredData.length))
          .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end");

      svg.append("g")
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y));
  };

  return (
      <div className='chart-container introduction1'>
        <div className='dropdown-container'>
          <h1>Starbucks Beverage Data</h1>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
              ))}
          </select>
          </div>
          <svg ref={svgRef}></svg>
        </div>
    );
}

function CustomizeDrink() {
  const [size, setSize] = useState(1);
  const [activeLayer, setActiveLayer] = useState(null);
  const [layerOptions] = useState([
      ["2% reduced fat", "1% reduced fat", "Soy milk", "Almond milk", "Oat milk"],
      ["Zero Calorie sugar", "Sugar(Normal)", "Honey", "Maple Syrup"],
      ["Coffee Type 1", "Coffee Type 2", "Coffee Type 3"],
      ["Cream", "No Cream"]
  ]);
  const [layerSizeMultipliers, setLayerSizeMultipliers] = useState([1, 1, 1, 1]);
  const canvasRef = useRef(null);

  useEffect(() => {
      drawCanvas();
  }, [size, layerSizeMultipliers]);

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const layers = calculateLayers();
    const clickedLayer = layers.find(layer =>
      x >= layer.left && x <= layer.right && y >= layer.top && y <= layer.bottom
    );

    if (clickedLayer) {
      setActiveLayer(clickedLayer.index);
    } else {
      setActiveLayer(null);
    }
  };

  const handleOptionChange = (event) => {
    if (activeLayer !== null) {
      const newMultipliers = [...layerSizeMultipliers];
      newMultipliers[activeLayer] = parseFloat(event.target.value);
      setLayerSizeMultipliers(newMultipliers);
    }
  };


  const drawCanvas = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const width = 400;
      const height = size * 200;
      canvas.width = width;
      canvas.height = height;

      context.clearRect(0, 0, width, height);
      const layers = calculateLayers();
      layers.forEach(layer => {
        context.fillStyle = layer.color;
        context.beginPath();
        context.moveTo(layer.left, layer.top);
        context.lineTo(layer.right, layer.top);
        context.lineTo(layer.right, layer.bottom);
        context.lineTo(layer.left, layer.bottom);
        context.closePath();
        context.fill();
      });

      const topMostLayer = layers[0];
    const bottomMostLayer = layers[layers.length - 1];

    context.strokeStyle = "rgb(0, 128, 0)";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(topMostLayer.left, topMostLayer.top);
    context.lineTo(topMostLayer.right, topMostLayer.top);
    context.lineTo(bottomMostLayer.right, bottomMostLayer.bottom);
    context.lineTo(bottomMostLayer.left, bottomMostLayer.bottom);
    context.closePath();
    context.stroke();
  };

const calculateLayers = () => {
    const width = 400;
    const height = size * 200;
      const cupWidthTop = 60 * size;
      const cupWidthBottom = 40 * size;
      const cupHeight = 120 * size;
      const cupX = width / 2;
      const cupY = 60;

      const colors = ["grey", "#f5f5dc", "brown", "#fffdd0"];
      const layerHeight = cupHeight / 4;
      const layers = [];

      for (let i = 0; i < 4; i++) {
        const topY = cupY + i * layerHeight;
        const bottomY = topY + layerHeight;
        const topWidth = cupWidthTop - (i * (cupWidthTop - cupWidthBottom) / 4);
        const bottomWidth = topWidth - ((cupWidthTop - cupWidthBottom) / 4);
        layers.push({
          index: i,
          top: topY,
          bottom: bottomY,
          left: cupX - bottomWidth / 2,
          right: cupX + bottomWidth / 2,
          color: colors[i]
        });
      }
      return layers;
    };
  

    return (
      <div>
        <label>Size:</label>
        <select onChange={e => setSize(parseFloat(e.target.value))} value={size}>
          <option value="1">Short</option>
          <option value="1.5">Tall</option>
          <option value="2">Grande</option>
          <option value="2.5">Venti</option>
        </select>
        {activeLayer !== null && (
          <select onChange={handleOptionChange} value={layerSizeMultipliers[activeLayer]}>
            {layerOptions[activeLayer].map((option, index) => (
              <option key={index} value={index + 1}>{option}</option>
            ))}
          </select>
        )}
        <canvas ref={canvasRef} onClick={handleCanvasClick} style={{ border: '1px solid black' }} />
      </div>
    );
  }
  
function LayoutComponent() {
  return (
      <section className='introduction1 d-flex align-items-center '>
          <div className='container-fluid'>
              <div className='row'>
                  <div className='offset-md-1 col-md-5'>
                      <div className='card shadow'>
                          <div className='card-body'>
                              <CustomizeDrink />
                          </div>
                      </div>
                  </div>
                  <div className='col-md-5 offset-md-0'>
                      <div className='card shadow'>
                          <div className='card-body'>
                            <h1 className='card-title'>Equivalent to</h1>
                            <p className='card-text'>
                              unhealthy options
                            </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
}