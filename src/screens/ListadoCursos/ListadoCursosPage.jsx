import React, { useEffect, useState } from "react"
import {Container} from 'react-bootstrap'
import { useNavigate } from "react-router"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Layout from "../../components/Layout"
import FiltroCarrera from "./components/FiltroCarrera"
import GridCursos from "./components/GridCursos"
const ListadoCursosPage = () => {
    const [listadoCarreras, setListadoCarreras] = useState([])
    const [listadoCursos, setListadoCursos] = useState([])

    const navigate = useNavigate() // hook de navegacion

    const httpObtenerCarreras = async () => {
        const resp = await fetch("http://localhost:4444/carreras")
        const data = await resp.json()
        console.log(data)
        setListadoCarreras(data)
    }
    const httpObtenerCursos = async (carreraId = null) => {
        const ruta = carreraId == null ? 
            "http://localhost:4444/cursos" : 
            `http://localhost:4444/cursos?carrera=${carreraId}`
        const resp = await fetch(ruta)
        const data = await resp.json()
        console.log(data)
        setListadoCursos(data)
    }
    useEffect(() => {
        httpObtenerCarreras()
        httpObtenerCursos()
    }, [])
    const onCarreraSelected = (carreraId) => {
        console.log("Se selecciono carrera " +  carreraId)
        httpObtenerCursos(carreraId)
    }

    const onCursoSelected = (cursoId) => {
        // Pasar al siguiente Page ListadoEvaluacionesPage
        navigate(`/evaluaciones/${cursoId}`)
    }

    return <Layout
        makeHeader={ () => <Header titulo="Listado de Cursos" /> }
        makeBody={ 
            () =>  <div>
                <FiltroCarrera 
                    carreras={ listadoCarreras }
                    onCarreraSelected={ onCarreraSelected }/>
                <GridCursos 
                    cursos={ listadoCursos }
                    onCursoSelected={ onCursoSelected }/>
            </div>
        }
        makeFooter={ () => <Footer /> }
    />
}
export default ListadoCursosPage