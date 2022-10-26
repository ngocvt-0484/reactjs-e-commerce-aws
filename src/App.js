import React, {Component} from 'react';
import  './app.css';
import ReactDOM from "react-dom";
import Product from './Product';
import Category from './Category';
import Type from './Type';
import Branch from './Branch';


class App extends React.Component {
  state = {
      isLoading: true,
      products: [],
      originProducts: [],
      categories: [],
      types: [],
      branchs: [],
      error: null,
      inputSearch: '',
      selectedCategory: null
  };
  getFetchProducts() {
    this.setState({
        loading: true
    }, () => {
        fetch("http://localhost:3000/products").then(res => res.json()).then(result =>
          this.setState({loading: false, products: result, originProducts: result})
        ).catch(console.log);
    });
  }

  getFetchCategories() {
    this.setState({
        loading: true
    }, () => {
        fetch("http://localhost:3000/categories").then(res => res.json()).then(result =>
          this.setState({loading: false, categories: result})
        ).catch(console.log);
    });
  }

  getFetchTypes() {
    this.setState({
        loading: true
    }, () => {
        fetch("http://localhost:3000/types").then(res => res.json()).then(result =>
          this.setState({loading: false, types: result})
        ).catch(console.log);
    });
  }

  getFetchBranchs() {
    this.setState({
        loading: true
    }, () => {
        fetch("http://localhost:3000/branchs").then(res => res.json()).then(result =>
          this.setState({loading: false, branchs: result})
        ).catch(console.log);
    });
  }

  componentDidMount() {
    this.getFetchProducts();
    this.getFetchCategories();
    this.getFetchTypes();
    this.getFetchBranchs();
  }

  search = () => {
    let val = this.state.inputSearch;
    const selectedTypeIds = this.state.types.filter(type => type.checked == true).map(type => type.id);
    const selectedBranchIds = this.state.branchs.filter(branch => branch.checked == true).map(branch => branch.id);
    const selectedCategory = this.state.selectedCategory;
    if (val == '' && selectedTypeIds.length == 0 && selectedBranchIds == 0 && selectedCategory == null) {
      this.setState({products: this.state.originProducts})
    } else {
      let updatedProductList = this.state.products;
      if (selectedCategory) {
        updatedProductList = this.state.originProducts;
      }
      updatedProductList = updatedProductList.filter(product => this.filterProduct(product, selectedTypeIds, selectedBranchIds, selectedCategory));
      this.setState({products: updatedProductList})
    }
  };

  filterProduct = (product, selectedTypeIds, selectedBranchIds, selectedCategory) => {
    return ((this.state.inputSearch == '' || product.title == this.state.inputSearch) &&
      (selectedTypeIds.length == 0 || selectedTypeIds.includes(product.type_id)) && (selectedBranchIds.length == 0 || selectedBranchIds.includes(product.branch_id)) && (selectedCategory == null || selectedCategory == product.category_id))
  }

  updateInputSearch = (event) => {
    const val = event.target.value;
    this.setState({inputSearch: val});
    this.search();
  }

  handleClickType = (typeId) => {
    const updatedTypes = this.state.types;
    const updateElement = updatedTypes.find(element => element.id == typeId);
    updateElement.checked = !updateElement.checked;

    this.setState({types: updatedTypes});
    this.search();
  }

  handleClickBranch = (branchId) => {
    const updatedBranchs = this.state.branchs;
    const updateElement = updatedBranchs.find(element => element.id == branchId);
    updateElement.checked = !updateElement.checked;

    this.setState({branchs: updatedBranchs});
    this.search();
  }


  handleClickCategory = (id) => {
    this.setState({selectedCategory: id});
    this.search();
  };

  render() {
    const {products, categories, types, branchs, error} = this.state;
    const productList = products.map(product => {
      const {id, title, price, image_url} = product;
      return (
        <Product id={id} title={title} price={price} imageurl={image_url} />
      );
    });

    const categoryList = categories.map(category => {
      const {id, name} = category;
      return (
        <Category id={id} name={name} handleClickCategory={() => this.handleClickCategory(id)} />
      );
    });

    const typeList = types.map(type => {
      const {id, name, checked} = type;
      return (
        <Type id={id} name={name} checked={checked} handleClickType={() => this.handleClickType(id)} />
      );
    });

    const branchList = branchs.map(branch => {
      const {id, name, checked} = branch;
      return (
        <Branch id={id} name={name} checked={checked} handleClickBranch={() => this.handleClickBranch(id)} />
      );
    });


    return (
      <div className="container-fluid">
         <header className="content-wrapper">
          <a href="https://community.algolia.com/instantsearch.js/" className="is-logo"><img src="logo192.png" width={40} /></a>
          <a href="./" className="logo">amazing</a>
          <div className="input-group">
            <input type="text" className="form-control" id="q" value={this.state.inputSearch}
              onChange={event => this.updateInputSearch(event)}
             />
            <span className="input-group-btn">
              <button className="btn btn-default" onClick={this.search}><i className="fa fa-search" /></button>
            </span>
          </div>
        </header>

        <div className="content-wrapper">
          <aside>
            <div id="clear-all" />
            <section className="facet-wrapper">
              <div className="facet-category-title">Show results for</div>
              <div id="categories">
                <div className="ais-root ais-hierarchical-menu">
                  <div className="ais-body ais-hierarchical-menu--body">
                    <div className="ais-hierarchical-menu--list ais-hierarchical-menu--list__lvl0">
                      {categoryList}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="facet-wrapper">
              <div className="facet-category-title">Refine by</div>
              <div id="types" className="facet">
                <div className="ais-root ais-refinement-list">
                  <div className="ais-refinement-list--header ais-header">
                    <div className="facet-title">Type</div>
                  </div>
                  <div className="ais-body ais-refinement-list--body">
                    <div className="ais-refinement-list--list">
                      {typeList}
                    </div>
                  </div>
                </div>
              </div>
              <div id="brands" className="facet">
                <div className="ais-root ais-refinement-list">
                  <div className="ais-refinement-list--header ais-header">
                    <div className="facet-title">Brand</div>
                  </div>
                  <div className="ais-body ais-refinement-list--body">
                    <div className="ais-refinement-list--list">
                      <form noValidate className="searchbox sbx-sffv">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}><symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-search-12" viewBox="0 0 40 41"><path d="M30.967 27.727l-.03-.03c-.778-.777-2.038-.777-2.815 0l-1.21 1.21c-.78.78-.778 2.04 0 2.817l.03.03 4.025-4.027zm1.083 1.084L39.24 36c.778.778.78 2.037 0 2.816l-1.21 1.21c-.777.778-2.038.78-2.816 0l-7.19-7.19 4.026-4.025zM15.724 31.45c8.684 0 15.724-7.04 15.724-15.724C31.448 7.04 24.408 0 15.724 0 7.04 0 0 7.04 0 15.724c0 8.684 7.04 15.724 15.724 15.724zm0-3.93c6.513 0 11.793-5.28 11.793-11.794 0-6.513-5.28-11.793-11.793-11.793C9.21 3.93 3.93 9.21 3.93 15.725c0 6.513 5.28 11.793 11.794 11.793z" fillRule="evenodd" /></symbol><symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-clear-2" viewBox="0 0 20 20"><path d="M8.96 10L.52 1.562 0 1.042 1.04 0l.522.52L10 8.96 18.438.52l.52-.52L20 1.04l-.52.522L11.04 10l8.44 8.438.52.52L18.96 20l-.522-.52L10 11.04l-8.438 8.44-.52.52L0 18.96l.52-.522L8.96 10z" fillRule="evenodd" /></symbol></svg>
                        <div role="search" className="sbx-sffv__wrapper">
                        <input type="search" name="search" placeholder="Search for other..." autoComplete="off" required className="sbx-sffv__input" />
                        <button type="submit" title="Submit your search query." className="sbx-sffv__submit"><svg role="img" aria-label="Search"><use xlinkHref="#sbx-icon-search-12" /></svg></button><button type="reset" title="Clear the search query." className="sbx-sffv__reset"><svg role="img" aria-label="Reset"><use xlinkHref="#sbx-icon-clear-2" /></svg></button></div>
                      </form>
                      {branchList}
                    </div>
                  </div>
                </div>
              </div>
              <div id="rating" className="facet" />
              <div id="prices" className="facet" />
            </section>
            <div className="thank-you">
              Data courtesy of <a href="https://developer.bestbuy.com/">Best Buy</a>
            </div>
          </aside>
          <div className="results-wrapper">
            <section id="results-topbar">
              <div className="sort-by">
                <label>Sort by</label>
                <div id="sort-by-selector" />
              </div>
              <div id="stats" className="text-muted" />
            </section>
            <main id="hits">
              {error ? null : productList}
            </main>
            <section id="pagination" />
          </div>
        </div>
      </div>


    );
  }
}
export default App;
