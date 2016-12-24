import { Dimensions } from 'react-native'
import React, { View, DeviceEventEmitter } from 'react-native'
class SomeScene extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleHeight: Dimensions.get('window').height
        }
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    keyboardWillShow(e) {
        const newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({ visibleHeight: newSize })
    }

    keyboardWillHide(e) {
        this.setState({ visibleHeight: Dimensions.get('window').height })
    }


    render() {
        return (
            <View style={{ height: this.state.visibleHeight }}>
                ...
      </View>
        )
    }
}