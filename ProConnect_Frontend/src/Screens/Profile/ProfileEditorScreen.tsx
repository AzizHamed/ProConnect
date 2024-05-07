import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccount, setUserAccount } from '../../Services/Redux/Slices/AuthSlice';
import { useForm } from 'react-hook-form';
import BackgroundView from '../../Components/Layout/BackgroundView';
import ProTextInput from '../../Components/Controls/ProTextInput';
import { IS_WEB, PHONE_REGEX, defaultWidthValues } from '../../Constants/Values';
import ProButton from '../../Components/Controls/ProButton';
import { useNavigation } from '@react-navigation/native';
import { Profession, UpdatePersonalInfoRequest, UpdateProfessionsRequest, User, UserProfession, useGetAllProfessionsQuery, useGetUserProfessionsQuery, useGetUserRolesQuery, useUpdateProfileMutation } from '../../Services/Redux/Api';
import { Keyboard } from 'react-native';
import ProTextView from '../../Components/Layout/ProTextView';
import ProfileImage from '../../Components/Layout/ProfileImage';
import ProIconButton from '../../Components/Controls/ProIconButton';
import { useImagePicker } from '../../Hooks/useImagePicker';
import { uploadSelectedFiles } from '../../Services/Firebase/Firebase';
import ProRadioGroup from "../../Components/Controls/ProRadioGroup";
import ProExpandableView from '../../Components/Layout/ProExpandableView';
import ProDatePicker from '../../Components/Controls/ProDatePicker';
import ValidatedDropDown from '../../Components/Controls/ValidatedDropdown';
import ProChipInput from '../../Components/Controls/ProChipInput';
import ProLoading from '../../Components/Layout/ProLoading';
import { Colors } from 'react-native-ui-lib';

const ProfileEditorScreen: React.FC = () => {
  const isWeb = IS_WEB();
  // API calls
  const { data: userRolesData } = useGetUserRolesQuery({});
  const { data: professionsData } = useGetAllProfessionsQuery({});
  const { data: userProfessionsData, isLoading: isLoadingUserProfessionsData } = useGetUserProfessionsQuery({});
  const [updateProfile] = useUpdateProfileMutation();

  // Navigation
  const navigation = useNavigation();
  // Redux
  const dispatch = useDispatch();
  const user = useSelector(getUserAccount);

  // Form
  const firstName = user?.name?.firstName || '';
  const lastName = user?.name?.lastName || '';
  const phone = user?.phoneNumber || '';
  const email = user?.email || '';
  const [selectedWorkArea, setSelectedWorkArea] = useState<string>(user?.workAreas || "North")
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { control, handleSubmit, reset, formState: { errors: fromErrors, isValid, isDirty } } = useForm({
    defaultValues: useMemo(() => {
      return { email, firstName, lastName, phone };
    }, [user])
  });
  // Form Refs
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const [isDropdownValid, setIsDropdownValid] = useState(false);
  const [isDropdownValid2, setIsDropdownValid2] = useState(false);

  // Personal Information
  const { selectPictures, selectedFiles, clear } = useImagePicker();
  const [selectedProfilePictureUri, setSelectedProfilePictureUri] = useState(user?.photoUrl || '');
  const accountTypeOptions = userRolesData?.map((role) => role.name) || [];
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);

  // Professions;
  const [userProfession, setUserProfession] = useState<UserProfession>({ services: [], startDate: "01-01-2001" });
  const [chipComponentHeight, setChipComponentHeight] = useState<number>(0);

  // The role index that is selected in the radio group (Homeowner or Professional)
  // Profession Dropdown Validation
  const [triggerValidation, setTriggerValidation] = useState(false);
  const professionsOptions = professionsData?.map((profession: Profession) => ({
    value: profession.id,
    label: profession.name,
  })) || [];

  const workAreas = [
    { label: "North", value: "North" },
    { label: "Haifa", value: "Haifa" },
    { label: "Center", value: "Center" },
    { label: "BeerShevaa", value: "BeerShevaa" },
    { label: "South", value: "South" }
  ]


  useEffect(() => {
    if (userProfessionsData !== undefined && userProfessionsData !== null && userProfessionsData.length > 0) {
      console.log('User Professions Data', userProfessionsData);
      setUserProfession(userProfessionsData[0]);
      if(selectedProfilePictureUri ==='') setSelectedProfilePictureUri(user?.photoUrl || '');
    }
    setIsLoading(isLoadingUserProfessionsData);
  }, [userProfessionsData, isLoadingUserProfessionsData])

  useEffect(() => {
    setTriggerValidation(prevValue => !prevValue);
  }, [isDirty])

  // Profile Picture
  useEffect(() => {
    if (selectedFiles.size === 0) return;
    const entry = selectedFiles.entries().next();
    if (entry.done)
      setSelectedProfilePictureUri('');
    else
      setSelectedProfilePictureUri(entry.value[entry.value.length - 1].uri || '');
  }, [selectedFiles])

  const isProfessionalUser: boolean = (selectedRoleIndex == 1 || (user && user.roles !== null && user.roles !== undefined && user?.roles.length > 0 && user.roles[0].code === "PRO")) || false;

  const setProfessionDate = (date: Date) => {
    if (date !== null || userProfession !== null || userProfession !== undefined) {
      const newDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '-');
      console.log('Date', newDate)
      setUserProfession({ ...userProfession, startDate: newDate });
    }
  }

  const setSelectedProfession = (professionId: number) => {
    // console.log('Selected Profession Index', professionId)
    if (professionsData === undefined) return;
    const profession = professionsData.find((profession, i) => profession.id === professionId);
    // console.log(profession)
    setUserProfession({ ...userProfession, profession: profession });
  }

  const addService = (service: string) => {
    setUserProfession({ ...userProfession, services: [...(userProfession.services || []), service] });
  }

  const removeService = (index: number) => {
    setUserProfession({ ...userProfession, services: (userProfession.services || []).filter((_, i) => i !== index) });
  }

  const handleOnSubmit = () => {
    setTriggerValidation(prevState => !prevState);
    handleSubmit(onSavePressed)();
  }

  const onSavePressed = async (profileData: any) => {
    const { email, firstName, lastName, phone } = profileData;
    // navigation.dispatch(DrawerActions.openDrawer());
    let profilePicDownloadUrl = user?.photoUrl || '';
    if (selectedProfilePictureUri !== '') {
      await uploadSelectedFiles('profiles', [{ uri: selectedProfilePictureUri, fileName: 'profile.jpg' }], user as User)
        .then((res) => { profilePicDownloadUrl = res[0] })
        .catch((error) => { setError(error.message); return; })
    }
    const roles = isProfessionalUser ? [userRolesData[1]] : (userRolesData === undefined ? [] : [userRolesData[selectedRoleIndex]]);
    const updatePersonalInfoRequest: UpdatePersonalInfoRequest = { name: { firstName: firstName, lastName: lastName }, phoneNumber: phone, photoUrl: profilePicDownloadUrl, roles: roles, workAreas: selectedWorkArea };
    const updateProfessionsRequest: UpdateProfessionsRequest = { professions: [userProfession] };
    const updateProfileRequest = { updateProfileRequest: { updatePersonalInfoRequest: updatePersonalInfoRequest, updateProfessionsRequest: isProfessionalUser ? updateProfessionsRequest : {} } };
    console.log(JSON.stringify(updateProfileRequest));
    setIsLoading(true);
    updateProfile(updateProfileRequest).unwrap()
      .then((res) => {
        setIsLoading(false);
        let updatedUser = res;
        dispatch(setUserAccount(updatedUser as User));
        navigation.reset({ index: 0, routes: [{ name: "Main" }] });
      }).
      catch((error) => { console.log(error); setError(error.message); setIsLoading(false); });
  }

  const cancel = async () => {
    navigation.navigate("Profile");

  }
  if (user?.accountStatus === 'SETUP') {
    // navigation.dispatch(DrawerActions.closeDrawer());
  }

  if (isLoading) return <BackgroundView children={(<ProLoading />)} />

  return (
    <BackgroundView hasScroll children={(
      <View style={{ alignItems: "center", paddingTop: 20 }} onTouchStart={() => { Keyboard.dismiss(); }}>
        <ProExpandableView title='Personal Information' height={400 + (user?.accountStatus === 'SETUP' ? 75 : 0)} isInitiallyExpanded
          children={
            (
              <View style={{ alignItems: "center" }}>

                <View style={{ alignItems: 'center', alignSelf: 'center', width: 150 }}>
                  <ProfileImage user={user} size={125} navigateToProfileDisabled/>
                  <ProIconButton displayBackground ionicon ioniconName="camera" showAddIcon onPress={() => { clear(); selectPictures('GALLERY'); }} style={{ position: 'absolute', right: 5, bottom: 0 }} />
                </View>
                <ProTextView text={`${user?.email}`} />

                <View style={{ flexDirection: 'row', width: defaultWidthValues() }}>

                  <ProTextInput flexShrink marginR={5}
                    name="firstName"
                    control={control}
                    placeholder="First Name"
                    rules={{
                      required: "First Name is required",
                    }}
                    returnKeyType='next'
                    textContentType='givenName'
                    ref={firstNameRef}
                    onSubmitEditing={() => lastNameRef.current?.focus()}

                  />
                  <ProTextInput flexShrink marginL={5}
                    name="lastName"
                    control={control}
                    placeholder="Last Name"
                    rules={{
                      required: "Last Name is required",
                    }}
                    returnKeyType='next'
                    textContentType='familyName'
                    ref={lastNameRef}
                    onSubmitEditing={() => phoneRef.current?.focus()}
                  />
                </View>
                <ProTextInput
                  name="phone"
                  control={control}
                  placeholder="Phone"
                  rules={{
                    required: "Phone is required",
                    pattern: { value: PHONE_REGEX, message: "Phone is invalid" }
                  }}
                  textContentType='telephoneNumber'
                  keyboardType='phone-pad'
                  ref={phoneRef}
                  onSubmitEditing={() => Keyboard.dismiss()}
                />

                <ValidatedDropDown setIsValid={setIsDropdownValid2} triggerValidation={triggerValidation} control={control} errorMessage='You must select an area.'
                  values={workAreas} setValue={setSelectedWorkArea} selectedValue={"North"} />
                {user?.accountStatus === 'SETUP' && <ProRadioGroup options={accountTypeOptions} title="Are you a homeowner or a professional?" setSelectedIndex={function (index: number): void {
                  setSelectedRoleIndex(index);
                }}></ProRadioGroup>
                }
              </View>
            )
          }
        />
        {isProfessionalUser &&
          <ProExpandableView title='Profession' height={200 + chipComponentHeight + 110} isInitiallyExpanded
            children={
              (
                <View style={{ alignItems: 'center' }}>
                  <ValidatedDropDown setIsValid={setIsDropdownValid} triggerValidation={triggerValidation} control={control} errorMessage='You must select a profession.'
                    values={professionsOptions} setValue={setSelectedProfession} selectedValue={userProfession.profession?.id} leftIcon={(
                      userProfession.profession?.iconUrl ? <Image resizeMode='contain'
                          style={{ width: 25, height: 25, marginLeft: 10 }}
  
                          source={{ uri: userProfession.profession?.iconUrl}}
                          tintColor={Colors.black}
                        /> : <></>
                  )} />
                  <ProDatePicker date={userProfession.startDate} control={control} name={'When did you start working in this field?'} placeholder='Start Date' setDateValue={setProfessionDate} />
                  <ProChipInput label='Which services do you offer?' items={userProfession.services} placeholder='Enter new service...'
                    setComponentHeight={setChipComponentHeight}
                    onAddItem={addService} onRemoveItem={removeService}
                  />
                </View>
              )
            }
          />
        }


        {/* <ProButton
          text={"Cancel"}
          onPress={cancel}
        /> */}

        <ProButton
          disabled={!isValid || (!isDropdownValid && isDropdownValid2 && isProfessionalUser)}
          text={"Save"}
          onPress={handleOnSubmit}
        />
        <ProButton
          text={"Reset"}
          onPress={reset}
        />
      </View>

    )}
    />
  )
}

export default ProfileEditorScreen

const styles = StyleSheet.create({})