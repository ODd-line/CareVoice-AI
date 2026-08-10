package com.carevoice.mobile;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends Activity {
    private static final int REQ_VOICE = 42;
    private static final int REQ_CALL = 77;
    private static final String PREFS = "carevoice_native_prefs";
    private SharedPreferences prefs;
    private LinearLayout root;
    private LinearLayout content;
    private TextView statusText;
    private String selectedRole;
    private String activePhone = "+85291234567";
    private String activeHospitalPhone = "+85235068888";
    private String pendingPairCode = "";
    private String pendingHubUrl = "http://carevoice-micro.local:3000";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
        selectedRole = prefs.getString("role", "");
        Uri launchData = getIntent().getData();
        if (launchData != null && "carevoice".equals(launchData.getScheme()) && "pair".equals(launchData.getHost())) {
            pendingPairCode = launchData.getQueryParameter("code") == null ? "" : launchData.getQueryParameter("code");
            pendingHubUrl = launchData.getQueryParameter("hub") == null ? pendingHubUrl : launchData.getQueryParameter("hub");
        }
        buildShell();
        if (selectedRole.isEmpty()) {
            showLoginPortal();
        } else {
            showWorkspace(selectedRole);
        }
    }

    private void buildShell() {
        ScrollView scrollView = new ScrollView(this);
        scrollView.setFillViewport(true);
        root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(18), dp(18), dp(18), dp(28));
        root.setBackgroundColor(Color.rgb(247, 250, 249));
        scrollView.addView(root);

        LinearLayout header = new LinearLayout(this);
        header.setOrientation(LinearLayout.HORIZONTAL);
        header.setGravity(Gravity.CENTER_VERTICAL);
        header.setPadding(0, 0, 0, dp(12));
        TextView title = title("CareVoice App", 24);
        header.addView(title, new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1));
        Button reset = secondaryButton("Switch Role");
        reset.setOnClickListener(v -> showLoginPortal());
        header.addView(reset);
        root.addView(header);

        statusText = body("Native app mode. Sign in and choose a role.");
        root.addView(statusText);
        content = new LinearLayout(this);
        content.setOrientation(LinearLayout.VERTICAL);
        root.addView(content);

        setContentView(scrollView);
    }

    private void showLoginPortal() {
        content.removeAllViews();
        statusText.setText("Login portal. Choose your role, then continue to the private workspace.");
        addCard("Google Login", "Native Google/Firebase login can be connected after adding google-services.json. For app testing, this button creates a local signed-in session.");
        Button google = primaryButton("Continue with Google");
        google.setOnClickListener(v -> {
            prefs.edit().putBoolean("signedIn", true).putString("memberName", "CareVoice Member").apply();
            toast("Signed in for app testing");
        });
        content.addView(google);

        content.addView(section("Choose Portal"));
        content.addView(roleButton("Patient", "Daily care, health log, voice assistant, SOS", "patient"));
        content.addView(roleButton("Hospital Staff", "Rooms, ward roster, hospital account tools, triage", "hospital_staff"));
        content.addView(roleButton("Family Member", "Family updates, WhatsApp/SMS/Gmail, calendar, alerts", "family_member"));
    }

    private Button roleButton(String label, String description, String role) {
        Button button = primaryButton(label + "\n" + description);
        button.setAllCaps(false);
        button.setGravity(Gravity.START | Gravity.CENTER_VERTICAL);
        button.setOnClickListener(v -> {
            selectedRole = role;
            prefs.edit()
                    .putBoolean("signedIn", true)
                    .putString("role", role)
                    .putString("roleRoute", roleRoute(role))
                    .putLong("updatedAt", System.currentTimeMillis())
                    .apply();
            showWorkspace(role);
        });
        return button;
    }

    private void showWorkspace(String role) {
        content.removeAllViews();
        statusText.setText("Signed in as " + roleLabel(role) + ". Role saved locally for this native app.");
        if ("patient".equals(role)) {
            showPatientWorkspace();
        } else if ("hospital_staff".equals(role)) {
            showStaffWorkspace();
        } else if ("family_member".equals(role)) {
            showFamilyWorkspace();
        } else {
            showLoginPortal();
        }
        showSharedTools();
    }

    private void showPatientWorkspace() {
        content.addView(section("Patient Workspace"));
        EditText feeling = input("How do you feel today?");
        EditText medicine = input("Medication taken? Any side effects?");
        content.addView(feeling);
        content.addView(medicine);
        Button saveLog = primaryButton("Save Health Log");
        saveLog.setOnClickListener(v -> saveNote("Patient health log", feeling.getText() + " | " + medicine.getText()));
        content.addView(saveLog);
        content.addView(actionButton("Voice Health Note", v -> startVoiceInput()));
        content.addView(actionButton("Call Family", v -> callNumber(activePhone)));
        content.addView(actionButton("SOS Emergency", v -> callNumber("999")));
        addCard("Guided Check-in", "CareVoice asks only the missing safety questions: pain, breathing, medication, appetite, falls, and mood.");
    }

    private void showStaffWorkspace() {
        content.addView(section("Hospital Staff Workspace"));
        EditText hospitalName = input("Hospital account name");
        EditText ward = input("Ward or room group");
        EditText patient = input("Patient name / age / notes");
        content.addView(hospitalName);
        content.addView(ward);
        content.addView(patient);
        content.addView(actionButton("Create Hospital Account", v -> saveNote("Hospital account", hospitalName.getText().toString())));
        content.addView(actionButton("Add Ward Patient", v -> saveNote("Ward patient", ward.getText() + " | " + patient.getText())));
        content.addView(actionButton("Create Secure Room", v -> saveNote("Secure room", "Room " + nowCode() + " for " + patient.getText())));
        content.addView(actionButton("Call Ward / Hospital", v -> callNumber(activeHospitalPhone)));
        addCard("Patient Board", "Rooms can store who the patient is, watch-outs, chart tags, action buttons, and triage notes.");
    }

    private void showFamilyWorkspace() {
        content.addView(section("Family Member Workspace"));
        EditText patientName = input("Patient name");
        EditText update = input("Family update message");
        EditText phone = input("Family phone, e.g. +85291234567");
        content.addView(patientName);
        content.addView(update);
        content.addView(phone);
        content.addView(actionButton("Save Family Update", v -> saveNote("Family update", patientName.getText() + " | " + update.getText())));
        content.addView(actionButton("Send WhatsApp", v -> sendWhatsApp(phone.getText().toString(), update.getText().toString())));
        content.addView(actionButton("Send SMS", v -> sendSms(phone.getText().toString(), update.getText().toString())));
        content.addView(actionButton("Send Gmail", v -> sendEmail(update.getText().toString())));
        content.addView(actionButton("Call Hospital", v -> callNumber(activeHospitalPhone)));
        addCard("Care Calendar", "Medication reminders, appointment notes, family alerts, and approved hospital updates live here.");
    }

    private void showSharedTools() {
        showDevicePairing();
        content.addView(section("Core Tools"));
        content.addView(actionButton("Generate Session Brief", v -> saveNote("Session brief", "Generated at " + timestamp())));
        content.addView(actionButton("Export Local Notes", v -> shareText("CareVoice notes", prefs.getString("notes", "No notes yet."))));
        content.addView(actionButton("Data Controls", v -> toast("Essential local storage only. Clear notes from Settings or Switch Role.")));
        TextView notes = body(prefs.getString("notes", "No local notes yet."));
        notes.setPadding(0, dp(12), 0, dp(12));
        content.addView(notes);
        Button clear = secondaryButton("Clear Local App Data");
        clear.setOnClickListener(v -> {
            prefs.edit().clear().apply();
            selectedRole = "";
            showLoginPortal();
        });
        content.addView(clear);
    }

    private void showDevicePairing() {
        content.addView(section("Bedside Controller"));
        String linkedDevice = prefs.getString("linkedDevice", "");
        if (!linkedDevice.isEmpty()) {
            addCard("Local device linked", linkedDevice + "\nPatient and doctor routing is supplied by the CareVoice hub.");
            return;
        }
        EditText hub = input("Local hub address");
        hub.setText(pendingHubUrl);
        EditText code = input("Six-digit pairing code");
        code.setText(pendingPairCode);
        EditText label = input("This device name");
        label.setText("CareVoice Android App");
        content.addView(hub);
        content.addView(code);
        content.addView(label);
        content.addView(actionButton("Connect to Bedside Controller", v -> claimDevicePairing(hub.getText().toString(), code.getText().toString(), label.getText().toString())));
        addCard("Local connection only", "Pairing works only while this app and the CareVoice Raspberry Pi are on the same local network. The public website cannot create device links.");
    }

    private void claimDevicePairing(String hubValue, String code, String deviceLabel) {
        String hub = hubValue.trim().replaceAll("/+$", "");
        if (!code.matches("\\d{6}") || !(hub.startsWith("http://192.168.") || hub.startsWith("http://10.") || hub.startsWith("http://172.") || hub.startsWith("http://carevoice-micro.local") || hub.startsWith("http://localhost"))) {
            toast("Use a six-digit code and a local CareVoice hub address.");
            return;
        }
        statusText.setText("Connecting to the local CareVoice hub...");
        new Thread(() -> {
            HttpURLConnection connection = null;
            try {
                connection = (HttpURLConnection) new URL(hub + "/api/local/device-pairing").openConnection();
                connection.setRequestMethod("POST");
                connection.setConnectTimeout(5000);
                connection.setReadTimeout(5000);
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setDoOutput(true);
                String payload = "{\"action\":\"claim\",\"code\":\"" + code + "\",\"deviceLabel\":\"" + jsonEscape(deviceLabel.trim()) + "\"}";
                try (OutputStream output = connection.getOutputStream()) {
                    output.write(payload.getBytes(StandardCharsets.UTF_8));
                }
                int responseCode = connection.getResponseCode();
                BufferedReader reader = new BufferedReader(new InputStreamReader(responseCode < 400 ? connection.getInputStream() : connection.getErrorStream(), StandardCharsets.UTF_8));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) response.append(line);
                reader.close();
                if (responseCode >= 400) throw new Exception("The code expired, was already used, or the hub rejected it.");
                prefs.edit().putString("linkedDevice", deviceLabel.trim()).putString("hubUrl", hub).apply();
                runOnUiThread(() -> {
                    toast("Bedside controller linked");
                    showWorkspace(selectedRole);
                });
            } catch (Exception error) {
                runOnUiThread(() -> statusText.setText("Could not link: " + error.getMessage()));
            } finally {
                if (connection != null) connection.disconnect();
            }
        }).start();
    }

    private String jsonEscape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Tell CareVoice what happened");
        try {
            startActivityForResult(intent, REQ_VOICE);
        } catch (Exception ex) {
            toast("Voice recognition is not available on this device.");
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQ_VOICE && resultCode == RESULT_OK && data != null) {
            ArrayList<String> results = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            if (results != null && !results.isEmpty()) {
                saveNote("Voice note", results.get(0));
                showWorkspace(selectedRole);
            }
        }
    }

    private void callNumber(String number) {
        if (checkSelfPermission(Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.CALL_PHONE}, REQ_CALL);
            return;
        }
        Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + number));
        startActivity(intent);
    }

    private void sendSms(String phone, String message) {
        Intent intent = new Intent(Intent.ACTION_SENDTO, Uri.parse("smsto:" + cleanPhone(phone)));
        intent.putExtra("sms_body", message);
        startActivity(intent);
    }

    private void sendWhatsApp(String phone, String message) {
        String url = "https://wa.me/" + cleanPhone(phone) + "?text=" + Uri.encode(message);
        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
    }

    private void sendEmail(String message) {
        Intent intent = new Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:"));
        intent.putExtra(Intent.EXTRA_SUBJECT, "CareVoice update");
        intent.putExtra(Intent.EXTRA_TEXT, message);
        startActivity(Intent.createChooser(intent, "Send CareVoice update"));
    }

    private void shareText(String title, String body) {
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("text/plain");
        intent.putExtra(Intent.EXTRA_TEXT, body);
        startActivity(Intent.createChooser(intent, title));
    }

    private void saveNote(String type, CharSequence body) {
        String oldNotes = prefs.getString("notes", "");
        String next = oldNotes + "\n[" + timestamp() + "] " + type + ": " + body;
        prefs.edit().putString("notes", next.trim()).apply();
        toast(type + " saved");
    }

    private TextView section(String text) {
        TextView view = title(text, 20);
        view.setPadding(0, dp(22), 0, dp(8));
        return view;
    }

    private void addCard(String title, String body) {
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setPadding(dp(14), dp(14), dp(14), dp(14));
        card.setBackgroundColor(Color.WHITE);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        params.setMargins(0, dp(10), 0, dp(10));
        card.setLayoutParams(params);
        card.addView(title(title, 18));
        card.addView(body(body));
        content.addView(card);
    }

    private TextView title(String text, int size) {
        TextView view = new TextView(this);
        view.setText(text);
        view.setTextSize(size);
        view.setTextColor(Color.rgb(15, 23, 42));
        view.setGravity(Gravity.START);
        view.setTypeface(null, 1);
        return view;
    }

    private TextView body(String text) {
        TextView view = new TextView(this);
        view.setText(text);
        view.setTextSize(15);
        view.setTextColor(Color.rgb(51, 65, 85));
        view.setLineSpacing(4, 1.0f);
        return view;
    }

    private EditText input(String hint) {
        EditText editText = new EditText(this);
        editText.setHint(hint);
        editText.setSingleLine(false);
        editText.setMinLines(1);
        editText.setPadding(dp(12), dp(8), dp(12), dp(8));
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        params.setMargins(0, dp(8), 0, dp(8));
        editText.setLayoutParams(params);
        return editText;
    }

    private Button primaryButton(String text) {
        Button button = new Button(this);
        button.setText(text);
        button.setTextColor(Color.WHITE);
        button.setBackgroundColor(Color.rgb(15, 118, 110));
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        params.setMargins(0, dp(8), 0, dp(8));
        button.setLayoutParams(params);
        return button;
    }

    private Button secondaryButton(String text) {
        Button button = new Button(this);
        button.setText(text);
        button.setTextColor(Color.rgb(15, 118, 110));
        button.setBackgroundColor(Color.WHITE);
        return button;
    }

    private Button actionButton(String text, View.OnClickListener listener) {
        Button button = primaryButton(text);
        button.setOnClickListener(listener);
        return button;
    }

    private String roleLabel(String role) {
        if ("hospital_staff".equals(role)) return "Hospital Staff";
        if ("family_member".equals(role)) return "Family Member";
        return "Patient";
    }

    private String roleRoute(String role) {
        if ("hospital_staff".equals(role)) return "staff";
        if ("family_member".equals(role)) return "family";
        return "patient";
    }

    private String cleanPhone(String value) {
        String cleaned = value == null ? "" : value.replaceAll("[^0-9+]", "");
        return cleaned.isEmpty() ? activePhone.replace("+", "") : cleaned.replace("+", "");
    }

    private String timestamp() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.US).format(new Date());
    }

    private String nowCode() {
        return new SimpleDateFormat("HHmmss", Locale.US).format(new Date());
    }

    private int dp(int value) {
        return (int) (value * getResources().getDisplayMetrics().density + 0.5f);
    }

    private void toast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
}