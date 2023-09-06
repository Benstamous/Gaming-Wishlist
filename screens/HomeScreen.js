import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const FeaturedItem = (props) => {
    const { item } = props;
    const releaseDate = (item) => {
        return new Date(item.releaseDate).toLocaleDateString('en-US');
    }

    if (props.isLoading) {
        return (        
            <View>
                <Text>Fucking Wait</Text>
            </View>
        )
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={{ uri: baseUrl + item.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'right',
                            fontSize: 20,
                            margin: 50
                            }}
                        >
                            
                            {item.name}
                            {'\n'}
                            {item.note1}
                            {'\n'}
                            {item.releaseDate}

                        </Text>
                    </View>
                </Card.Image>
            </Card>
        );
    }
    return <View />;
};

const HomeScreen = () => {
    const games = useSelector((state) => state.games);

    const featGame = games.gamesArray.find((item) => item.favorite);

    return (
        <ScrollView>
            <FeaturedItem
                item={featGame}
                isLoading={games.isLoading}
                errMess={games.errMess}
            />
        </ScrollView>
    );
};

export default HomeScreen;