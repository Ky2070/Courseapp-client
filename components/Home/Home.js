import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import Apis, { endpoint } from "../../configs/Apis";
import { Chip, List } from "react-native-paper";


const Home = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCourse = async () => {
        try {
            setLoading(true);
            let url = endpoint['courses'];
            let res = await Apis.get(url);
            setCourses(res.data.results);
        } catch {
            
        } finally{
            setLoading(false);
        }
    }
    
    const loadCate = async () => {
        let res = Apis.get(endpoint['categories']);
        setCategories(res,data);
    }

    useEffect(() => {
        loadCate();
    },[]);

    useEffect(() => {
        loadCourse();
    },[])

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>E-COURSE ONLINE</Text>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                {categories.map(c=> <Chip style={MyStyles.m} key={c.id} icon="label">{c.name}</Chip>)}
            </View>
            {loading && <ActivityIndicator />}
            <FlatList data={courses} renderItem={({item}) => <List.Item title={item.subject} description={item.created_date} left={()=> <Image source={item.image}/>}/>} />
        </View>
        
    );
}
export default Home