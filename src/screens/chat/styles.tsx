import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    justifyContent: 'space-between',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 16,
    alignItems: 'center',
    gap: 14,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  selectedCategoryButton: {
    backgroundColor: '#ebeaea',
    borderColor: 'black',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    height: 80,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  recordingTime: {
    color: '#666',
    fontSize: 12,
  },
  audioMessage: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginVertical: 8,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#F1EFF0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  audioDuration: {
    color: '#666',
    fontSize: 12,
    marginLeft: 6,
  },
  welcomeMessage: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    height: 80,
  },
  waveformContainer: {
    flex: 1,
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F6F9',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  playTime: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#666',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    height: 80,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    marginLeft: 10,
  },
  lottie: {
    width: '80%',
    height: 24,
  },
  travelGPTTextStyle: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
    color: '#000',
  },
  textMessage: {
    maxWidth: '80%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-end',
    backgroundColor: '#F1EFF0',
  },
  messageText: {
    color: '#222222',
    fontSize: 16,
  },
  previewStyle: {
    flex: 1,
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F6F9',
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 8,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  lottieView: {
    flex: 1,
    paddingHorizontal: 5,
  },
  lottieStyle: {
    width: '100%',
    height: 24,
  },
  msgLottieStyle: {
    width: '60%',
    height: 24,
  },
  msgListStyle: {
    flex: 1,
    padding: 16,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  dummyHeaderView: {width: 24},
  listFooterView: {height:20},
});
