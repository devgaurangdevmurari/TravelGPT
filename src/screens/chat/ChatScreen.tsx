import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import LottieView from 'lottie-react-native';

import {styles} from './styles';
import {Message} from '../../types';
import {useAudioRecorder, useMessages} from '../../hooks';

const categories = [
  {label: 'Holiday 🏖️'},
  {label: 'Flight ✈️'},
  {label: 'Transfer 🚗'},
  {label: 'Activity 🏃‍♂️'},
  {label: 'Hotel 🏨'},
];

const ChatScreen: React.FC = () => {
  const flatListRef = useRef<FlatList | null | any>(null);

  const {
    playTime,
    isPreviewPlaying,
    isMessagePlaying,
    recordedUri,
    recordTime,
    showPreview,
    isRecording,
    playingAudio,
    onStartRecord,
    onStopRecord,
    onCancelRecord,
    onPlayPreview,
    onPlayAudio,
    resetAudioStates,
  } = useAudioRecorder();

  const {
    messages,
    textMessage,
    selectedCategory,
    setTextMessage,
    sendTextMessage,
    sendAudioMessage,
    handleCategorySelect,
  } = useMessages();

  const handleSendAudioMessage = () => {
    sendAudioMessage(recordedUri, recordTime);
    resetAudioStates();
  };

  const renderCategoryButton = (label: string) => (
    <TouchableOpacity
      key={label}
      style={[
        styles.categoryButton,
        selectedCategory === label && styles.selectedCategoryButton,
      ]}
      onPress={() => handleCategorySelect(label)}>
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const renderInputSection = () => {
    if (isRecording) {
      return (
        <View style={styles.recordingContainer}>
          <TouchableOpacity
            style={styles.recordButton}
            onPress={onCancelRecord}>
            <Image
              source={require('../../assets/close.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <View style={styles.waveformContainer}>
            <LottieView
              source={require('../../assets/voice_assistance.json')}
              autoPlay
              loop={true}
              speed={0.9}
              style={styles.lottie}
              resizeMode="cover"
            />
            <Text style={styles.recordingTime}>{recordTime}</Text>
          </View>
          <TouchableOpacity style={styles.recordButton} onPress={onStopRecord}>
            <Image
              source={require('../../assets/check.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (showPreview) {
      return (
        <View style={styles.previewContainer}>
          <TouchableOpacity onPress={onCancelRecord}>
            <Image
              source={require('../../assets/delete.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <View style={styles.previewStyle}>
            <TouchableOpacity onPress={onPlayPreview}>
              <Image
                source={
                  isPreviewPlaying
                    ? require('../../assets/pause.png')
                    : require('../../assets/play.png')
                }
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            <View style={styles.lottieView}>
              <LottieView
                source={require('../../assets/voice_assistance.json')}
                autoPlay={showPreview && isPreviewPlaying}
                loop={showPreview && isPreviewPlaying}
                speed={0.9}
                style={styles.lottieStyle}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.recordingTime}>
              {isPreviewPlaying ? `${playTime}/${recordTime}` : recordTime}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendAudioMessage}>
            <Image
              source={require('../../assets/send.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.inputContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={textMessage}
            onChangeText={setTextMessage}
            placeholder="Ask anything..."
            placeholderTextColor={'#888'}
            multiline
          />
          <TouchableOpacity style={styles.micButton} onPress={onStartRecord}>
            <Image
              source={require('../../assets/mic.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendTextMessage}>
          <Image
            source={require('../../assets/send.png')}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMessage = ({item, index}: {item: Message; index: number}) => {
    if (item.type === 'audio') {
      return (
        <View key={index} style={styles.audioMessage}>
          <TouchableOpacity
            onPress={() => onPlayAudio(item.uri!)}
            style={styles.audioPlayer}>
            <Image
              source={
                playingAudio === item.uri && isMessagePlaying
                  ? require('../../assets/pause.png')
                  : require('../../assets/play.png')
              }
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <LottieView
            source={require('../../assets/voice_assistance.json')}
            autoPlay={playingAudio === item.uri && isMessagePlaying}
            loop={playingAudio === item.uri && isMessagePlaying}
            speed={0.9}
            style={styles.msgLottieStyle}
            resizeMode="cover"
          />
          <Text style={styles.audioDuration}>{item.duration}</Text>
        </View>
      );
    }

    return (
      <View key={index} style={[styles.textMessage]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/drawer.png')}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            <Text style={styles.travelGPTTextStyle}>{'Travel GPT'}</Text>
            <View style={styles.dummyHeaderView} />
          </View>
          <FlatList
            bounces={false}
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            style={styles.msgListStyle}
            contentContainerStyle={styles.contentContainerStyle}
            ListFooterComponent={<View style={styles.listFooterView}/>}
            onContentSizeChange={() =>
              flatListRef.current.scrollToEnd({animated: true})
            }
            ListHeaderComponent={
              messages.length > 0 ? null : (
                <View style={styles.welcomeMessage}>
                  <Text style={styles.welcomeText}>
                    {
                      'Hi there! 👋 My name is Tratoli. How can I assist you today?'
                    }
                  </Text>
                  <View style={styles.categoriesContainer}>
                    {categories.map(category =>
                      renderCategoryButton(category.label),
                    )}
                  </View>
                </View>
              )
            }
          />
          {selectedCategory && renderInputSection()}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
