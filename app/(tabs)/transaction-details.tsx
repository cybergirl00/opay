import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { formatDate, formattedCurrency } from '@/lib/data';
import CustomButton from '@/components/CustomButton';

import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

const TransactionDetail = () => {
    const {
        remarks,
        amount,
        date,
        type,
        counterpartyName,
        counterpartyBank,
        counterpartyAccountNumber
    } = useLocalSearchParams();

    const safeRemarks = Array.isArray(remarks) ? remarks[0] : remarks;

    const receiptRef = useRef<View>(null);

    const shareReceipt = async () => {
        try {
            const uri = await captureRef(receiptRef, {
                format: 'png',
                quality: 1,
            });
            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error('Failed to share:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesome name="angle-left" size={20} />
                </TouchableOpacity>
                <Text style={styles.title}>Transaction Details</Text>
                <FontAwesome name="headphones" size={20} color="#02BB86" />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* Receipt to capture */}
                <View ref={receiptRef} style={styles.receipt}>
                    <Text style={styles.centerText}>{safeRemarks}</Text>
                    <Text style={styles.amount}>{formattedCurrency(Number(amount))}</Text>
                    <Text style={styles.success}>Successful</Text>

                    {/* Status Row */}
                    <View style={styles.statusRow}>
                        <View style={styles.statusItem}>
                            <FontAwesome name="check-circle" size={16} color={'#4ade80'} />
                            <Text style={styles.statusLabel}>Payment Successful</Text>
                            <Text style={styles.statusDate}>{formatDate(date)}</Text>
                        </View>
                        <View style={styles.statusItem}>
                            <FontAwesome name="check-circle" size={16} color={'#4ade80'} />
                            <Text style={styles.statusLabel}>Processing by bank</Text>
                            <Text style={styles.statusDate}>{formatDate(date)}</Text>
                        </View>
                        <View style={styles.statusItem}>
                            <FontAwesome name="check-circle" size={16} color={'#4ade80'} />
                            <Text style={styles.statusLabel}>Received by bank</Text>
                            <Text style={styles.statusDate}>{formatDate(date)}</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            The recipient account is expected to be credited within 5 minutes,
                            subject to notification by the bank.
                        </Text>
                    </View>

                    <View style={styles.details}>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Amount</Text>
                            <Text>{formattedCurrency(Number(amount))}</Text>
                        </View>

                        {(type === 'CR' || type === 'DB') && (
                            <View style={styles.detailRow}>
                                <Text style={styles.label}>
                                    {type === 'CR' ? 'Recipient Details' : 'Sender Details'}
                                </Text>
                                <Text numberOfLines={1} style={{ maxWidth: 160 }}>
                                    {counterpartyName} | {counterpartyBank} | {counterpartyAccountNumber}
                                </Text>
                            </View>
                        )}

                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Fee</Text>
                            <Text>{formattedCurrency(0)}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Amount Paid</Text>
                            <Text>{formattedCurrency(Number(amount))}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <CustomButton name="Share Receipt" onPress={shareReceipt} />
        </View>
    );
};

export default TransactionDetail;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 32 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        elevation: 3,
    },
    title: { fontWeight: 'bold', fontSize: 16 },
    receipt: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        elevation: 3,
    },
    centerText: { textAlign: 'center', fontSize: 12 },
    amount: { textAlign: 'center', fontSize: 26, fontWeight: 'bold', marginTop: 8 },
    success: { textAlign: 'center', color: '#4ade80', fontWeight: '600', fontSize: 14 },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    statusItem: {
        alignItems: 'center',
        width: 90,
    },
    statusLabel: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 4,
    },
    statusDate: {
        fontSize: 9,
        color: '#999',
        marginTop: 2,
    },
    infoBox: {
        backgroundColor: '#e5e5e5',
        borderRadius: 6,
        padding: 8,
        marginTop: 20,
    },
    infoText: {
        fontSize: 10,
        textAlign: 'center',
        color: '#555',
    },
    details: {
        marginTop: 16,
        gap: 6,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        color: '#777',
        fontSize: 12,
    },
});
