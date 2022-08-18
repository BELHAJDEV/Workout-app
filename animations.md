const value = useState(new Animated.ValueXY({ x: 0 , y:0}))[0];

function move (){

    Animated.timing(value,{
        toValue : {x : 100 ,y : 100},
        duration : 1000,
        useNativeDriver : false
    }).start()
}


<Animated.View styles={value.getLayout()}>

</Animated.View>