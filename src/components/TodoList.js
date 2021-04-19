import React, {Component} from 'react';
import Todo from "./Todo";



class TodoList extends Component {
    constructor(props) {
        super(props);

    this.state = {
        text: "",
        todos: []
    };
    
}

handleChange = (e) => {
    this.setState({
        text: e.target.value
    })
   
}

handleSubmit = (e) => {
    e.preventDefault();
   const name = this.state.text;
        this.setState({
            todos: [name,...this.state.todos]
            
        })
            
     this.setState({
         text: ""
     })

}


    render() {
        return(
            <>
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.text} type="text" onChange={this.handleChange} style={{border: "2px solid black"}}></input>
                <button style={{margin: "10px"}} onClick={this.handleSubmit} className="fas fa-plus addtodo"></button>
            </form>

            {this.state.todos.map(todo => {
               return <Todo  todo={todo} />
            })}

            </>
        )
        
    }

}

export default TodoList;