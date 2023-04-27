import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps ={
    country:"in",
    pageSize:8,
    category:'general'
  }
  static propTypes ={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  
  articles=[] 
  constructor(){
    super();
    // console.log("hello i am constructor from News Component");
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }
  handlePrevClick=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=850d30b562e24b268753d78592372b89&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data= await fetch(url)
    let parsedData= await data.json();
    // console.log(parsedData);
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading:false
    });
  }
  handleNextClick=async()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=850d30b562e24b268753d78592372b89&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    
    let data= await fetch(url)
    let parsedData= await data.json();
    this.setState();

    this.setState({
      page:this.state.page+1,
      articles:parsedData.articles,
      loading:false
    })}
  }
  async componentDidMount(){
    // console.log("cdm");
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=850d30b562e24b268753d78592372b89&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data= await fetch(url)
    let parsedData= await data.json();
    // console.log(parsedData);
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    });
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsHub - Top Headlines</h1>
        {this.state.loading&&<Spinner/>}
        <div className='row'>
        {!this.state.loading&&this.state.articles.map((element)=>{
           return <div className='col-md-4' key={element.url}>
           <NewsItem  title={element.title?element.title.slice(0,29):" "} description= {element.description?element.description.slice(0,88):" "} imageUrl={element.urlToImage} newsUrl={element.url}/>
           </div>
        })}
        <div className="container d-flex justify-content-between">
           <button disabled={this.state.page<=1} type="button" className="btn btn-outline-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
           <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
           </div>
        </div>
      </div>
    )
  }
}

export default News
