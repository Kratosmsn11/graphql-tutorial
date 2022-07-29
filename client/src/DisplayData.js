import React, { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";



const QUERY_ALL_USERS = gql`
    query GetAllUsers{
        users {
            id
            name
            age
            nationality
            username
            nationality
        }      
    }
`;

const QUERY_ALL_MOVIE = gql`
    query GetAllMovies{
        movies {
            name
        }      
    }
`;

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!){
        movie(name: $name){
            name
            yearOfPublication
        }
    }
`;


function DisplayData(){

    const [movieSearched, setMovieSearched] = useState("");

    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIE);
    const [
        fetchMovie, 
        {data: movieSearchedData, error: movieError}
    ] = useLazyQuery(GET_MOVIE_BY_NAME)

    if(loading){
        return <h1>Data is loading ... </h1> 
    }

    if(error){
        console.log(error)
    }

    if(data){
        console.log(data);
    }

    if(movieError){
        console.log(movieError);
    }

    return <div>
        {data && 
            data.users.map((user) => {
                return(
                    <div>
                        <h1> Name: {user.name}</h1>
                        <h1> Username: {user.username}</h1>
                        <h1> age: {user.age}</h1>
                        <h1> nationality: {user.nationality}</h1>
                    </div>
                );
            })
        }

        {movieData && movieData.movies.map((movie)=> {
            return <h1> Movie Name : {movie.name}</h1>
        })}


        <div>
            <input type="text" 
            placeholder="Enter a movie name"
            onChange={(e) => {
                setMovieSearched(e.target.value);
            }}
            />
            <button onClick={() => {
                fetchMovie({
                    variables:{
                        name: movieSearched,
                    },
                });
            }}> Fetch Data</button>
            <div>
                {movieSearchedData && <div>
                    {""}
                    <h1>Movie Name: {movieSearchedData.movie.name}</h1>
                    <h1> Year of Publication: {movieSearchedData.movie.yearOfPublication}</h1>
                    {""}
                    </div>}
                {movieError && <h1>No such movie exsits</h1>}
            </div>
        </div>
    </div>
};


export default DisplayData;