class View {
    constructor(){

        return {
            active:false,
            key:'',
            type:'', // label | list | metric
            name:'',
            label:'',
            icon:'',
            description:'',
            collection:null,
            grid:{
                    drag:{
                        x:null,
                        y:null,
                    },
                    resize:{
                        w:null,
                        h:null
                    }
            },
        
            colour:'',
            header:{
                name:'',
                title:'',
                description:''
            },
            labelView:{
                label:'',
                colour:'',
                description:'',
                class:{
                    title:'',
                    card:'',
                    description:''
                }

            },
            listView:{
                display:'',
                filter:{
                },
                limit:10,
                sort:{
                    field:null,
                    direction:'desc'
                },
            },
            aggregateRaw:{
        
            }
        }
    }

}


export{

    View
}