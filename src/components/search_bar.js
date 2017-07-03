import React from 'react';



class SearchBar extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {term: ''};
        
    }
    
    render(){
        return <div>
                  <input onChange={(event) => this.setState({term: event.target.value})}  /> Show Input Value: {this.state.term}
               </div>;
}

onInputChange(event){
    console.log(event.target.value);
    
}
    
}



export default SearchBar;






