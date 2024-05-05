import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultWidthValues } from '../../Constants/Values';

interface ProTableProps {
    title?: string;
    hasScroll?: boolean;
    rows: string[];
    onOpen?: (index: number) => void;
    onEdit?: (index: number) => void;
    onDelete?: (index: number) => void;
}

const ProTable: React.FC<ProTableProps> = (props) => {
    const width = defaultWidthValues();
    return (
        <ScrollView>

            <View invisible margin-20 padding-10 style={{borderColor: Colors.controlText}}>
                {props.title && <Text h4l center>{props.title}</Text>}
                <View height={2} width={width}></View>
                {props.rows.length === 0 && <Text center>No data</Text>}
                {props.rows.map((row, rowIndex) => (
                    <View invisible key={rowIndex}>
                        <View invisible style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} marginV-10>
                                <Text flex marginL-10>{row}</Text>
                                {props.onOpen && <TouchableOpacity onPress={() => { props.onOpen(rowIndex) }}>
                                    <Ionicons style={{ marginHorizontal: 5 }} size={20} name="open-outline" color={Colors.textPrimary} />
                                </TouchableOpacity>}
                                {props.onEdit && <TouchableOpacity onPress={() => { props.onEdit(rowIndex) }}>
                                    <AntDesign style={{ marginHorizontal: 5 }} size={20} name="edit" color={Colors.textPrimary} />
                                </TouchableOpacity>}
                                {props.onDelete && <TouchableOpacity onPress={() => { props.onDelete(rowIndex) }}>
                                    <Ionicons style={{ marginHorizontal: 5 }} name="trash" size={20} color={Colors.failure} />
                                </TouchableOpacity>}
                            </View>

                        </View>
                        <View height={2} width={"100%"}></View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default ProTable