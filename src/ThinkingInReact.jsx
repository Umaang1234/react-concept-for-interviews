import {useState} from "react";

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    );
}

function ProductRow({ product }) {
       const name = product.stocked ?
            product.name :
            <span style={{color: 'red'}}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
}
function ProductTable({products,filterText,inStockOnly}){
    const rows =[];
    let lastCategory = null;
    products.forEach((product)=>{
        if(product.name.indexOf(filterText) === -1){
            return;
        }
        if(inStockOnly && !product.stocked){
            return;
        }
        if(product.category!==lastCategory) {
            rows.push(<ProductCategoryRow category={product.category} key={product.category}>
            </ProductCategoryRow>)
        }

        rows.push(<ProductRow product={product} key={product.name}/>)
        lastCategory = product.category;
    })
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}
function SearchBar({filterText, inStockOnly, onFilterTextChange,onInStockChangeOnly}) {
    return (
        <form>
            <input type="text" placeholder="Search..."  value={filterText} onChange={(e)=>{onFilterTextChange(e.target.value)}}/>
            <label>
                <input type="checkbox" value={inStockOnly} onChange={(e)=> {onInStockChangeOnly(e.target.checked)}}/>
                {' '}
                Only show products in stock
            </label>
        </form>
    );
}
function FilterableProductTable(){
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    return (
        <div>
            <SearchBar filterText={filterText} inStockOnly = {inStockOnly} onFilterTextChange={setFilterText} onInStockChangeOnly={setInStockOnly}/>
            <ProductTable products={PRODUCTS} filterText={filterText} inStockOnly = {inStockOnly}/>
        </div>
    );
}

function App() {
    return <FilterableProductTable products={PRODUCTS} />;
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default App;