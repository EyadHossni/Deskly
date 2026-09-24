namespace ProjectNexusAPI.Models {
    public class SongInfo {
        public String ID { get; set; }
        public String Name { get; set; }
        public String Artist { get; set; }
        public String Status { get; set; }

        public SongInfo(string id, string name, string artist, string status) {
            ID = id;
            Name = name;
            Artist = artist;
            Status = status;
        }
    }
}
