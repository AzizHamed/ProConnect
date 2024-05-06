import { Image } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAccount } from '../../Services/Redux/Slices/AuthSlice'
import { getSelectedUser } from '../../Services/Redux/Slices/UserSlice'
import ProTable from '../../Components/Layout/ProTable'
import { selectJob } from '../../Services/Redux/Slices/JobSlice'
import { Job, useGetJobsQuery, useGetUserJobsByIdQuery, useGetUserJobsQuery } from '../../Services/Redux/Api'
import BackgroundView from '../../Components/Layout/BackgroundView'
import { useNavigation } from '@react-navigation/native'
import { Colors } from 'react-native-ui-lib'

interface JobsTableProps {
    userId?: string
}

const JobsTable: React.FC<JobsTableProps> = (props) => {
    const loggedInUser = useSelector(getUserAccount);
    const selectedUser = useSelector(getSelectedUser);
    const isLoggedInUser = loggedInUser?.id === selectedUser?.id;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, isSuccess, isError, error, refetch } = props.userId ? useGetUserJobsByIdQuery({ userId: props.userId }) : useGetUserJobsQuery();

    const jobs = data || [];
    const jobTitles = jobs.map((job) => `${job.title}`);
    const icons = jobs.map((job) => job.neededProfessions && <Image resizeMode='contain'
        style={{ width: 20, height: 20, marginLeft: 10, marginRight: 5 }}
        source={{ uri: job.neededProfessions[0]?.iconUrl || '' }}
        tintColor={Colors.textPrimary}
    /> || undefined);
    const onOpen = (index: number) => { selectJobIndex(index); navigation.navigate("Job"); };
    const onEdit = isLoggedInUser ? (index: number) => { selectJob(index); } : undefined;
    const onDelete = isLoggedInUser ? (index: number) => { selectJob(index); } : undefined;
    const selectJobIndex = (index: number) => { dispatch(selectJob(jobs[index])); }

    console.log(jobs)
    return (
        <BackgroundView children={
            <ProTable onOpen={onOpen} onEdit={onEdit} onDelete={onDelete} title='Jobs Table' rows={jobTitles} icons={icons} />
        } />
    )
}

export default JobsTable