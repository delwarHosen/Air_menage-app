
import { LeftArrowIcon } from '@/assets/icons/common_icon/LeftArrowIcon';
import { PlusCircleIcon } from '@/assets/icons/common_icon/PlusCircleIcon';
import { SendMessageIcon } from '@/assets/icons/common_icon/SendMessageIcon';
import { Body6, Caption1, Caption3 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { HOST_CONVERSATIONS } from '@/data/messagefakedata';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fp, hp, wp } from '../../../../utils/responsiveDevice';

export default function HostChatScreen() {
    const router = useRouter();
    const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
    const flatListRef = useRef<FlatList>(null);

    // conversation খুঁজে বের করা
    const conversation = HOST_CONVERSATIONS.find((c) => c.id === conversationId);

    const [messages, setMessages] = useState(conversation?.messages ?? []);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        const text = inputText.trim();
        if (!text) return;

        const newMsg = {
            id: String(Date.now()),
            sender: 'me' as const,
            time: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }),
            text,
        };

        setMessages((prev) => [...prev, newMsg]);
        setInputText('');

        // scroll to bottom
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    // time label — পরপর দুটো same time হলে শুধু একবার দেখাবে
    const shouldShowTime = (index: number) => {
        if (index === 0) return true;
        return messages[index].time !== messages[index - 1].time;
    };

    if (!conversation) return null;

    return (
        <SafeAreaView style={styles.safe}>
            {/* ── Header ── */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={styles.backBtn}
                >
                    <LeftArrowIcon size={22} color={Colors.PRIMARY_TEXT} />
                </Pressable>

                <Image
                    source={conversation.image}
                    style={styles.headerAvatar}
                    contentFit="cover"
                />
                <Body6 color={Colors.PRIMARY_TEXT}>{conversation.name}</Body6>
            </View>

            {/* ── Messages ── */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={hp(10)}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.messageList}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() =>
                        flatListRef.current?.scrollToEnd({ animated: false })
                    }
                    renderItem={({ item, index }) => (
                        <View>
                            {/* Time label */}
                            {shouldShowTime(index) && (
                                <Caption3
                                    color={"#989898"}
                                    align="center"
                                    style={styles.timeLabel}
                                >
                                    — {item.time} —
                                </Caption3>
                            )}

                            {/* Bubble */}
                            <View
                                style={[
                                    styles.bubbleRow,
                                    item.sender === 'me'
                                        ? styles.bubbleRowMe
                                        : styles.bubbleRowOther,
                                ]}
                            >
                                <View
                                    style={[
                                        styles.bubble,
                                        item.sender === 'me'
                                            ? styles.bubbleMe
                                            : styles.bubbleOther,
                                    ]}
                                >
                                    <Caption1
                                        color={
                                            item.sender === 'me'
                                                ? Colors.TEXT_WHITE
                                                : Colors.PRIMARY_TEXT
                                        }
                                    >
                                        {item.text}
                                    </Caption1>
                                </View>
                            </View>
                        </View>
                    )}
                />

                {/* ── Input bar ── */}
                <View style={styles.inputBar}>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Type Something . . ."
                            placeholderTextColor={Colors.PLACEHOLDER_TEXT}
                            multiline
                        />
                        <Pressable
                            onPress={() => {/* attach */ }}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <PlusCircleIcon size={24} color={Colors.TEXT_COLOR} />
                        </Pressable>
                    </View>

                    <Pressable
                        style={[
                            styles.sendBtn,
                            !inputText.trim() && styles.sendBtnDisabled,
                        ]}
                        onPress={handleSend}
                        disabled={!inputText.trim()}
                    >
                        <SendMessageIcon size={20} color={"#FFFFFF"} />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },

    // ── Header ───────────────────────────────────────────────────────────────
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(10),
        paddingHorizontal: wp(20),
        paddingVertical: hp(14),
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.BORDER_COLOR,
    },
    backBtn: {
        marginRight: wp(4),
    },
    headerAvatar: {
        width: wp(36),
        height: wp(36),
        borderRadius: wp(18),
    },

    // ── Messages ──────────────────────────────────────────────────────────────
    messageList: {
        paddingHorizontal: wp(16),
        paddingVertical: hp(16),
        gap: hp(4),
    },
    timeLabel: {
        marginVertical: hp(12),
    },
    bubbleRow: {
        flexDirection: 'row',
        marginBottom: hp(8),
    },
    bubbleRowMe: {
        justifyContent: 'flex-end',
    },
    bubbleRowOther: {
        justifyContent: 'flex-start',
    },
    bubble: {
        maxWidth: '75%',
        borderRadius: wp(24),
        paddingHorizontal: wp(14),
        paddingVertical: hp(10),
    },
    bubbleMe: {
        backgroundColor: '#636363',   // dark gray — design এর মতো
        borderBottomRightRadius: wp(2),
    },
    bubbleOther: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderTopLeftRadius: wp(4),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },

    // ── Input bar ─────────────────────────────────────────────────────────────
    inputBar: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: wp(10),
        paddingHorizontal: wp(16),
        paddingVertical: hp(12),
        // borderTopWidth: 1,
        // borderTopColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    inputBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: wp(24),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: wp(16),
        paddingVertical: hp(0),
        gap: wp(8),
        minHeight: hp(48),
    },
    input: {
        flex: 1,
        color: Colors.PRIMARY_TEXT,
        fontFamily: 'Poppins_400Regular',
        fontSize: fp(14),
        maxHeight: hp(100),
    },
    sendBtn: {
        width: wp(78),
        height: wp(48),
        borderRadius: wp(24),
        backgroundColor: "#006C93",
        alignItems: 'center',
        justifyContent: 'center',
        // flexShrink: 0,
    },
    sendBtnDisabled: {
        opacity: 0.5,
    },
});